import java.util.Stack;

public class Semantico implements Constants
{

    StringBuilder code;
    Stack<String> typeStack = new Stack<>();

    /**
     * Executa as acoes recebidas de acordo com o codigo
     *
     * */
    public void executeAction(int action, Token token)	throws SemanticError
    {
        System.out.println("A��o #"+action+", Token: "+token);

        switch (action) {
            case 100:
                System.out.println("action 100");
                generateHeader();
                break;
            case 101:
                System.out.println("action 101");
                generateFooter();
                break;
            case 128:
                System.out.println("action 128");
                stackInt(token);
                break;
            default:
                System.out.println("Default...");
        }

        System.out.println("---------------------------------------------------------");
        System.out.println(this.code);


    }

    /**

     .assembly extern mscorlib {}
     .assembly _codigo_objeto{}
     .module _codigo_objeto.exe

     .class public _UNICA{
     .method static public void _principal(){
     .entrypoint

     * */
    private void generateHeader() {
        code = new StringBuilder(".assembly extern mscorlib {}\n" +
                ".assembly _codigo_objeto{}\n" +
                ".module _codigo_objeto.exe\n" +
                "\n" +
                ".class public _UNICA{\n" +
                "  .method static public void _principal(){\n" +
                "     .entrypoint \n");
    }

    private void generateFooter() {
        code.append("     ret\n" +
                "  }\n" +
                "}");
    }


    private void stackInt(Token token) {
        typeStack.push("int64");
        code.append("ldc.64")
                .append(" ")
                .append(token.getLexeme())
                .append("\\n")
                .append("conv.r8");

    }

}
