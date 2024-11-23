import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Stack;

public class Semantico implements Constants {

    private static final String INT_TYPE = "int64";
    private static final String FLOAT_TYPE = "float64";
    private static final String BOOLEAN_TYPE = "bool";
    private static final String STRING_TYPE = "string";
    private StringBuilder code;
    private Stack<String> typeStack = new Stack<>();
    private Stack<String> pilhaRotulos = new Stack<>();
    private String operadorRelacional;
    private List<String> tabelaSimbolos = new ArrayList<>();
    private List<String> listaIds = new ArrayList<>();

    /**
     * Executa as acoes recebidas de acordo com o codigo
     */
    public void executeAction(int action, Token token) throws SemanticError {
        System.out.println("Ação #" + action + ", Token: " + token);

        switch (action) {
            case 100:
                generateHeader();
                break;
            case 101:
                generateFooter();
                break;
            case 102:
                setEqualsListaIds();
                break;
            case 106:
                writeConstant(token);
                break;
            case 107:
                breakLine();
                break;
            case 108:
                write();
                break;
            case 118:
                stackTrue();
                break;
            case 120:
                not();
                break;
            case 121:
                saveRelationalOperation(token);
                break;
            case 127:
                identifier(token);
                break;
            case 128:
                stackInt(token);
                break;
            case 129:
                stackFloat(token);
                break;
            case 131:
                subtraction();
                break;
            default:
                System.out.println("Default...");
        }

    }

    private void setEqualsListaIds() throws SemanticError {
        for (final String id : listaIds) {
            final String type;

            final Optional<String> simbol = tabelaSimbolos.stream()
                    .filter(v -> v.equals(id))
                    .findFirst();

            if (simbol.isPresent()) {
                throw new SemanticError(id + " já declarado");
            }

            tabelaSimbolos.add(id);

            if (id.startsWith("i_")) {
                type = INT_TYPE;
            } else if (id.startsWith("f_")) {
                type = FLOAT_TYPE;
            } else if (id.startsWith("s_")) {
                type = STRING_TYPE;
            } else {
                type = BOOLEAN_TYPE;
            }

            code.append(String.format(".locals (%s %s)", type, id))
                    .append("\n");
        }

        listaIds.clear();
    }

    private void writeConstant(Token token) {
        code.append("ldloc " + token.getLexeme())
                .append("call void [mscorlib]System.Console::Write (string)")
                .append("\n");
    }

    private void write() {
        final String type = typeStack.pop();

        if (type.equals(INT_TYPE)) {
            code.append("conv.i8")
                    .append("\n");
        }

        final String printCommand = String.format("call void [mscorlib]System.Console::Write(%s)", type);
        code.append(printCommand)
                .append("\n");
    }

    private void breakLine() {
        code.append("ldstr \"\n\"")
                .append("call void [mscorlib]System.Console::Write(string) ");
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
        typeStack.push(INT_TYPE);
        code.append("ldc.i8")
                .append(" ")
                .append(token.getLexeme())
                .append("\n")
                .append("conv.r8")
                .append("\n");

    }

    private void stackFloat(Token token) {
        typeStack.push(FLOAT_TYPE);
        code.append("ldc.r8")
                .append(" ")
                .append(token.getLexeme().replace(",", "."))
                .append("\n");
    }

    private void stackTrue() {
        typeStack.push(BOOLEAN_TYPE);
        code.append("ldc.i4.1")
                .append("\n");
    }

    private void subtraction() {
        typeStack.pop();
        typeStack.pop();
        code.append("sub")
                .append("\n");
    }

    private void saveRelationalOperation(Token token) {
        operadorRelacional = token.getLexeme();
    }

    private void not() {
        code.append("ldc.i4.1")
                .append("\n")
                .append("xor")
                .append("\n");
    }

    private void identifier(Token token) throws SemanticError {
        final String id = token.getLexeme();

        tabelaSimbolos.stream()
                .filter(v -> v.equals(id))
                .findFirst()
                .orElseThrow(() -> new SemanticError(id + " não declarado"));

        code.append("ldloc ")
                .append(id)
                .append("\n");

        if (id.startsWith("i_")) {
            typeStack.push(INT_TYPE);
            code.append("conv.r8")
                    .append("\n");
        } else if (id.startsWith("f_")) {
            typeStack.push(FLOAT_TYPE);
        } else if (id.startsWith("s_")) {
            typeStack.push(STRING_TYPE);
        } else {
            typeStack.push(BOOLEAN_TYPE);
        }

    }

    // TODO - Remove after tests
    public void printCode() {
        System.out.println("");
        System.out.println("-------------------");
        System.out.println(code.toString());
    }

}
