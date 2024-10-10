public class Main {
    public static void main(String[] args) {
//        final String content = args[0].replace("\\n", "\n");
        final String content = "main \n" +
                " i_lado, i_area; \n" +
                " read (\"digite um valor para lado:\", i_lado); \n" +
                " i_area = i_lado * i_lado; \n" +
                " writeln (i_area); \n" +
                "end\n";
        execute(content);
    }

    public static void execute(String content) {
        Lexico lexico = new Lexico();
        Sintatico sintatico = new Sintatico();
        Semantico semantico = new Semantico();
        lexico.setInput(content);
        try {
            sintatico.parse(lexico, semantico);    // tradução dirigida pela sintaxe
            System.out.println("Programa compilado com sucesso");
        } catch (LexicalError e) {  // tratamento de erros
            final String sequence = getSequenceByPosition(content, e);
            final String errorMessage = "linha " + findLineByPosition(content, e.getPosition()) + ": " + sequence + e.getMessage();
            System.out.println(errorMessage);
        } catch (SyntaticError e) {
            System.out.println(e.getPosition() + " símbolo encontrado: na entrada " + e.getMessage());

            //Trata erros sintáticos
            //linha 			      sugestão: converter getPosition em linha
            //símbolo encontrado    sugestão: implementar um método getToken no sintatico
            //símbolos esperados,   alterar ParserConstants.java, String[] PARSER_ERROR
            // consultar os símbolos esperados no GALS (em Documentação > Tabela de Análise Sintática):
        } catch (SemanticError e) {
            //Trata erros semânticos
        }

    }

    private static String getClassById(int id, int position) throws LexicalError {
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

        throw new LexicalError("palavra reservada inválida", position);
    }

    private static String getSequenceByPosition(String content, LexicalError exception) {
        if (exception.getMessage().equalsIgnoreCase("símbolo inválido")) {
            return String.valueOf(content.charAt(exception.getPosition())).concat(" ");

        } else if (exception.getMessage().equalsIgnoreCase("identificador inválido")) {
            final int endIndex = findEndIndex(content, exception.getPosition());
            return content.substring(exception.getPosition(), endIndex).concat(" ");

        } else if (exception.getMessage().equalsIgnoreCase("palavra reservada inválida")) {
            final int endIndex = findEndIndex(content, exception.getPosition());
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