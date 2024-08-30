public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");

        final String content = "st \n linha2 s_teste = \"Gustavo\" \n outra linha ";

        int line = findLineByPosition(content, 6);

        System.out.println("The line is: " + line);

        // execute(content);
    }

    public static void execute(String content) {
    Lexico lexico = new Lexico();
        lexico.setInput(content);
        try {
            Token t = null;
            while ( (t = lexico.nextToken()) != null ) {
                System.out.println(t.getLexeme()); 
                
                // só escreve o lexema, necessário escrever t.getId, t.getPosition()
            
                // t.getId () - retorna o identificador da classe. Olhar Constants.java e adaptar, pois 
            // deve ser apresentada a classe por extenso
            // t.getPosition () - retorna a posição inicial do lexema no editor, necessário adaptar 
            // para mostrar a linha	

                // esse código apresenta os tokens enquanto não ocorrer erro
                // no entanto, os tokens devem ser apresentados SÓ se não ocorrer erro, necessário adaptar 
            // para atender o que foi solicitado		   
            }
        }
        catch ( LexicalError e ) {  // tratamento de erros
            System.out.println(e.getMessage() + " em " + e.getPosition());
        
            // e.getMessage() - retorna a mensagem de erro de SCANNER_ERRO (olhar ScannerConstants.java 
            // e adaptar conforme o enunciado da parte 2)
            // e.getPosition() - retorna a posição inicial do erro, tem que adaptar para mostrar a 
            // linha  
        } 
	}

    /**
     * 
     * @param content the file content.
     * @param position the position to find the line.
     * @return the line of the position.
     */
    private static int findLineByPosition(String content, int position) {

        // run the string until find a \n - then count++. Stop when get to the position.

        int lines = 0;
        for (int i = 0; i < position; i++) {
            char current = content.charAt(i);
            char next = content.charAt(i+1); 

            // check if we found \n
            if (current == '\\' && next == 'n') {
                lines++;
            }

        }

        return lines;
    }
}