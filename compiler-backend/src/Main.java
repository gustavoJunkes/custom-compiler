import java.util.Formatter;

public class Main {
    public static void main(String[] args) {
        final String content = args[0].replace("\\n", "\n");
        execute(content);
    }

    public static void execute(String content) {
        final Formatter formatter = new Formatter();
        formatter.format("%-9s%-22s%-10s", "linha", "classe", "lexema");

        Lexico lexico = new Lexico();
        lexico.setInput(content);
        try {
            Token t = null;
            while ((t = lexico.nextToken()) != null) {
                final String clazz = getClassById(t.getId());
                final int line = findLineByPosition(content, t.getPosition());
                final String lexeme = clazz.equals("constante_float") ? t.getLexeme().replace(",", ".") : t.getLexeme();
                formatter.format("%n%-9d%-22s%-10s", line, clazz, lexeme);
            }
            formatter.format("%n%nPrograma compilado com sucesso");

            System.out.println(formatter);
        } catch (LexicalError e) {  // tratamento de erros
            final String sequence = getSequenceByPosition(content, e);

            final String errorMessage = "linha " + findLineByPosition(content, e.getPosition()) + ": " + sequence + " " + e.getMessage();

            System.out.println(errorMessage);
            
            // e.getMessage() - retorna a mensagem de erro de SCANNER_ERRO (olhar ScannerConstants.java
            // e adaptar conforme o enunciado da parte 2)
            // e.getPosition() - retorna a posição inicial do erro, tem que adaptar para mostrar a
            // linha
        } finally {
            formatter.close();
        }
    }

    private static String getClassById(int id) throws LexicalError {
        if (id >= 3 && id <= 15) {
            return "palavra reservada";
        }

        if (id >= 15 && id <= 31) {
            return "simbolo especial";
        }

        if (id == 32) {
            return "identificador";
        }

        if (id == 33) {
            return "constante_float";
        }

        if (id == 34) {
            return "constante_int";
        }

        if (id == 35) {
            return "constante_string";
        }

        throw new LexicalError("Id error");
    }

    private static String getSequenceByPosition(String content, LexicalError exception) {

        if (exception.getMessage().equalsIgnoreCase("símbolo inválido")) {
            return String.valueOf(content.charAt(exception.getPosition()));
        } else if (exception.getMessage().equalsIgnoreCase("identificador inválido")) {
            // aqui encontrar o identificador completo a partir da posição
            final int endIndex = content.indexOf(" ", exception.getPosition());
            return content.substring(exception.getPosition() - 1, endIndex);
        } else if (exception.getMessage().equalsIgnoreCase("constante_string inválida")) {
            return ""; // não precisa mostrar simbolo pra constante string invalida, nem pra comentario de bloco
        }

        return "";
    }


    /**
     * Given a string and a position, returns the line in which this position is located.
     *
     * @param content  the file content.
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