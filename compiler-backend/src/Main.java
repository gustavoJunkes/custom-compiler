public class Main {
    public static void main(String[] args) {
//        final String content = args[0].replace("\\n", "\n");
        final String content = "main\n" +
                "" +
                "" +
                "i_lado, i_area;\n" +
                " read (\"digite um valor para lado: , i_lado;\n" +
                " i_area = i_lado * i_lado;\n" +
                " writeln (i_area);\n" +
                "end\n";
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
            String errorMessage = "Erro na linha " + line + " -  Encontrado " + sequence + " esperado " + expectedTokens;
            System.out.println(errorMessage + " -- - -- " + e.getMessage());
        } catch (SemanticError e) {
            //Trata erros semânticos
        }
    }

    private static String getExpectedTokens(Exception e) {
        String message = e.getMessage();

        // TODO: 20/10/2024 melhorar a lógica de retorno de tokens, talvez adicionar cada um em uma constante string pra reutilizar em todos lugares.
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
                return "identificador"; // esse case está provavelmente errado, o caso em que é chamado é no comando read...
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
            } case "<expressao>", "<expressao1>", "<elemento>", "<relacional>", "<relacional1>", "<aritmetica>", "<aritmetica1>", "<termo>", "<termo1>", "<fator>": {
                return "expressão";
            } case "<lista_expressoes2>": {
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

    private static String getSequenceByPosition(String content, AnalysisError exception ) {
        String message = exception.getMessage();
        int position = exception.getPosition();
        boolean isConstString = content.charAt(position) == '"' && exception.getCause() instanceof SyntaticError;
        boolean isEOF = content.charAt(position) == '$';

        if (message.equalsIgnoreCase("símbolo inválido")) {
            return String.valueOf(content.charAt(position)).concat(" ");

        } else if (message.equalsIgnoreCase("identificador inválido") || message.equalsIgnoreCase("palavra reservada inválida")) {
            final int endIndex = findEndIndex(content, position);
            return content.substring(position, endIndex).concat(" ");
        } else if (isConstString) {
            return "constante_string".concat(" ");
        } else if (isEOF) {
            return "EOF".concat(" "); // TODO: 20/10/2024 caso encontre um fim de arquivo - refinar cenário.
        } else if (message.equalsIgnoreCase("constante_string inválida")){
            return "";
        } else if (message.equalsIgnoreCase("comentário de bloco inválido ou não finalizado")) {
            return "";
        } else {
            // TODO: encontrar o símbolo da string na posição que o erro acontece - tratar símbolos concatenados com strings -> ;ca
            final int endIndex = findEndIndex(content, position);
            return content.substring(position, endIndex).concat(" ");
        } 

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