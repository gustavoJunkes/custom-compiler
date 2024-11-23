import java.util.Stack;

public class Semantico implements Constants
{

    private StringBuilder code;
    private Stack<String> typeStack = new Stack<>();

    /**
     * Executa as acoes recebidas de acordo com o codigo
     *
     * */
    public void executeAction(int action, Token token)	throws SemanticError
    {
        System.out.println("Ação #"+action+", Token: "+token);

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
            case 129:
                stackFloat(token);
                break;
            default:
                System.out.println("Default...");
        }

    }

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
        code.append("ldc.i8")
                .append(" ")
                .append(token.getLexeme())
                .append("\n")
                .append("conv.r8");

    }

    private void stackFloat(Token token) {
        typeStack.push("float64");
        code.append("ldc.r8")
                .append(" ")
                .append(token.getLexeme().replace(",", "."))
                .append("\n");
    }

    // TODO - Remove after tests
    public void printCode() {
        System.out.println(code.toString());
    }

}
