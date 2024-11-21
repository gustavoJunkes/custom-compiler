import java.util.regex.Pattern;

public class Main {
    private static Pattern REGEX = Pattern.compile("[a-zA-Z0-9_]");

    public static void main(String[] args) {
        final String content = "main \n" +
                "write (\"oi\");;";
        if (content.length() == 0) {
            System.out.println("Programa compilado com sucesso");
            return;
        }
        execute(content);
    }

    public static void execute(String content) {
        Lexico lexico = new Lexico();
        Sintatico sintatico = new Sintatico();
        Semantico semantico = new Semantico();
        lexico.setInput(content);
        try {
            sintatico.parse(lexico, semantico);
            System.out.println("Programa compilado com sucesso");
        } catch (LexicalError e) {
            final String sequence = getSequenceByPosition(content, e);
            final String errorMessage = "linha " + findLineByPosition(content, e.getPosition()) + ": " + sequence + e.getMessage();
            System.out.println(errorMessage);
        } catch (SyntaticError e) {
            final int line = findLineByPosition(content, e.getPosition());
            String sequence = getSequenceByPosition(content, e);
            String expectedTokens = getExpectedTokens(e);
            String errorMessage = "Erro na linha " + line + " - Encontrado " + sequence + " esperado " + expectedTokens;
            System.out.println(errorMessage);
        } catch (SemanticError e) {
            //Trata erros semânticos
        }
    }

    private static String getExpectedTokens(Exception e) {
        String message = e.getMessage();

        switch (message) {
            case "<lista_entrada2>": {
                return " , )";
            } case "<programa>": {
                return "main";
            } case "<lista_instrucoes>": {
                return "identificador, read, write, writeln, if, repeat";
            } case "<lista_instrucoes1>": {
                return "end, if, read, write, writeln, repeat, identificador";
            } case "id": {
                return "identificador";
            } case "<lista_id>": {
                return "identificador";
            } case "<lista_id2>": {
                return ", ; =";
            } case "<instrucao>": {
                return "if, read, write, writeln, repeat, identificador";
            } case "<declaracao_variavel>": {
                return "identificador";
            } case "<declaracao_variavel2>": {
                return "; =";
            } case "<comando>": {
                return "end, read, write, writeln, repeat";
            } case "<comando_entrada>": {
                return "read";
            } case "<lista_entrada>": {
                return "identificador, constante_string";
            } case "<entrada>": {
                return "identificador, constante_string";
            } case "<pergunta>": {
                return "identificador, constante_string";
            } case "<comando_saida>": {
                return "write, writeln";
            } case "<comando_selecao>": {
                return "if";
            } case "<lista_comandos>": {
                return "if, read, write, writeln, repeat, identificador";
            } case "<lista_comandos2>": {
                return "end, if, elif, else, read, write, writeln, repeat, until, while, identificador";
            } case "<elif>": {
                return "end, elif, else";
            } case "<else>": {
                return "end, else";
            } case "<comando_repeticao>": {
                return "repeat";
            } case "<comando_repeticao2>": {
                return "until, while";
            } case "<operador_relacional>": {
                return "==, !=, <, >";
            } case "<lista_expressoes>": {
                return "expressao"; // na especificação existe uma regra para "expressão", e outra para "expressao"
            }
            // Separando os casos combinados
            case "<expressao>":
            case "<expressao1>":
            case "<elemento>":
            case "<relacional>":
            case "<relacional1>":
            case "<aritmetica>":
            case "<aritmetica1>":
            case "<termo>":
            case "<termo1>":
            case "<fator>": {
                return "expressão";
            }
            case "<lista_expressoes2>": {
                return ", )";
            } default: {
                return message;
            }
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

    private static String getSequenceByPosition(String content, AnalysisError exception) {
        String message = exception.getMessage();
        int position = exception.getPosition();

        if (position >= content.length()) {
            return "EOF";
        }

        boolean isConstString = isConstantString(content, position, exception);
        boolean isEOF = content.charAt(position) == '$';

        switch (message.toLowerCase()) {
            case "símbolo inválido":
                return String.valueOf(content.charAt(position)).concat(" ");
            case "identificador inválido":
            case "palavra reservada inválida":
                return getContentSubstring(content, position).concat(" ");
            case "constante_string inválida":
            case "comentário de bloco inválido ou não finalizado":
                return "";
            default:
                if (isConstString) {
                    return "constante_string ";
                } else if (isEOF) {
                    return "EOF ";
                } else {
                    return getContentSubstring(content, position).concat(" ");
                }
        }
    }

    private static boolean isConstantString(String content, int position, AnalysisError exception) {
        return content.charAt(position) == '"' && exception.getCause() instanceof SyntaticError;
    }

    private static String getContentSubstring(String content, int position) {
        int endIndex = findEndIndex(content, position);
        final String contentError = content.substring(position, endIndex);
        return contentError.trim().length() == 0 ? "EOF" : contentError;
    }



    private static int findEndIndex(String content, int position) {
        int endIndex = position;
        while (endIndex < content.length() && REGEX.matcher(content.substring(endIndex, endIndex+1)).matches()) {
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