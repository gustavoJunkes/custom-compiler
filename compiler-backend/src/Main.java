public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");

        execute("i_");
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
}