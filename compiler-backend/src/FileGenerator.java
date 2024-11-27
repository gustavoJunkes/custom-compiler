import java.io.FileWriter;
import java.io.IOException;

public class FileGenerator {

    public void createFile(String content, String fileName) {
        final int dotIndex = fileName.lastIndexOf('.');
        final String newFileName = fileName.substring(0, dotIndex) + ".il";

        try (FileWriter fileWriter = new FileWriter(newFileName)) {
            fileWriter.write(content);
        } catch (IOException e) {
            System.out.println("Erro ao gerar o arquivo. \n" + e.getMessage());
        }
    }
}
