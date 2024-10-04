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
                final String clazz = getClassById(t.getId(), t.getPosition());
                final int line = findLineByPosition(content, t.getPosition());
                final String lexeme = clazz.equals("constante_float") ? t.getLexeme().replace(",", ".") : t.getLexeme();
                formatter.format("%n%-9d%-22s%-10s", line, clazz, lexeme);
            }
            formatter.format("%n%nPrograma compilado com sucesso");

            System.out.println(formatter);
        } catch (LexicalError e) {  // tratamento de erros
            final String sequence = getSequenceByPosition(content, e);
            final String errorMessage = "linha " + findLineByPosition(content, e.getPosition()) + ": " + sequence + e.getMessage();
            System.out.println(errorMessage);
        } finally {
            formatter.close();
        }

//        TROCAR:
//
//        Lexico lexico = new Lexico();
//        lexico.setInput( /* entrada */ );
//        try
//        {
//            Token t = null;
//            while ( (t = lexico.nextToken()) != null )
//            {
//                System.out.println(t.getLexeme() + t.getId());
//            }
//        }
//        catch ( LexicalError e )
//        {
//            System.out.println(e.getMessage() + " " + e.getPosition());
//            //message  olhar ScannerConstants.java, String[] SCANNER_ERROR
//            //position precisa ser convertida para linha
//        }
//
//
//        POR:
//
////        Lexico lexico = new Lexico();
////        Sintatico sintatico = new Sintatico();
////        Semantico semantico = new Semantico();
////        lexico.setInput( /* entrada */ );
////        try
////        {
////            sintatico.parse(lexico, semantico);    // tradução dirigida pela sintaxe
////        }
////        // mensagem: programa compilado com sucesso - área reservada para mensagens
////
////        catch ( LexicalError e )
////        {
////            //Trata erros léxicos, conforme especificação da parte 2 - do compilador
////        }
////        catch ( SyntaticError e )
////        {
////            System.out.println(e.getPosition() + " símbolo encontrado: na entrada " + e.getMessage());
////
////            //Trata erros sintáticos
////            //linha 			      sugestão: converter getPosition em linha
////            //símbolo encontrado    sugestão: implementar um método getToken no sintatico
////            //símbolos esperados,   alterar ParserConstants.java, String[] PARSER_ERROR
////            // consultar os símbolos esperados no GALS (em Documentação > Tabela de Análise Sintática):
////        }
////        catch ( SemanticError e )
////        {
////            //Trata erros semânticos
////        }

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