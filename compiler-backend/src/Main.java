

public class Main {
    public static void main(String[] args) {
        final String content = "s_teste = \"Gustavo\"  \noutra linha onde temos problema i_4r \n outra linha";

         execute(content);
    }

    /**
     *
     * */
    public static void execute(String content) {
        Lexico lexico = new Lexico();
        lexico.setInput(content);
        try {
            Token t = null;
            while ( (t = lexico.nextToken()) != null ) {
                System.out.println(t.getLexeme());
            }
        }
        catch ( LexicalError e ) { 
            final String sequence = getSequenceByPosition(content, e);
            final String errorMessage = "linha " + findLineByPosition(content, e.getPosition()) + ": " + sequence + e.getMessage();
            System.out.println(errorMessage);
        
        } 
	}

    private static String getSequenceByPosition(String content, LexicalError exception) {
        if (exception.getMessage().equalsIgnoreCase("símbolo inválido")) {
            return String.valueOf(content.charAt(exception.getPosition())).concat(" ");
        } else if (exception.getMessage().equalsIgnoreCase("identificador inválido")) {
            // aqui encontrar o identificador completo a partir da posição
            int endIndex = findEndIndex(content, exception.getPosition());
            return content.substring(exception.getPosition(), endIndex).concat(" ");
        } else return "";
    }

    private static int findEndIndex(String content, int position) {
        int endIndex = position;
        while (endIndex < content.length() && content.charAt(endIndex) != ' ' && content.charAt(endIndex) != '\n') {
            endIndex++;
        }
        return endIndex;
    }

    /**
     * Given a string and a position, returns the line in which this position is located.
     * @param content the file content.
     * @param position the position to find the line.
     * @return the line of the position.
     */
    private static int findLineByPosition(String content, int position) {
        int lines = 1;
        for (int i = 0; i < position; i++) {
            char current = content.charAt(i);
            if (current == '\n') {
                lines++;
            }
        }
        return lines;
    }
}