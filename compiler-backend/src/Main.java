import gals.LexicalError;
import gals.Lexico;
import gals.Token;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");

        final String content = "i_9 st  \n linha2 s_teste = \"Gustavo\" \n outra linha";

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

            final String sequence = getSequenceByPosition(content, e);

            final String errorMessage = "linha " + findLineByPosition(content, e.getPosition()) + ": " + sequence + " " + e.getMessage();

            System.out.println(errorMessage);
            
            // e.getMessage() - retorna a mensagem de erro de SCANNER_ERRO (olhar ScannerConstants.java 
            // e adaptar conforme o enunciado da parte 2)
            // e.getPosition() - retorna a posição inicial do erro, tem que adaptar para mostrar a 
            // linha  
        } 
	}

    private static String getSequenceByPosition(String content, LexicalError exception) {

        if (exception.getMessage().equalsIgnoreCase("símbolo inválido")) {
            return String.valueOf(content.charAt(exception.getPosition()));
        } else if (exception.getMessage().equalsIgnoreCase("identificador inválido")) {
            // aqui encontrar o identificador completo a partir da posição
            final int endIndex = content.indexOf(" ", exception.getPosition());
            return content.substring(exception.getPosition()-1, endIndex);
        } else if (exception.getMessage().equalsIgnoreCase("constante_string inválida")) {
            return ""; // não precisa mostrar simbolo pra constante string invalida, nem pra comentario de bloco
        }

        return "";
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