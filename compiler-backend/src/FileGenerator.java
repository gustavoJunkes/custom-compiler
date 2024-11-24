import java.io.FileWriter;
import java.io.IOException;

public class FileGenerator {

    public void createFile(String content) {
        String fileName = "teste.il";

        try (FileWriter fileWriter = new FileWriter(fileName)) {
            fileWriter.write(content);
        } catch (IOException e) {
            System.out.println("Erro ao gerar o arquivo. \n" + e.getMessage());
        }
    }
}
