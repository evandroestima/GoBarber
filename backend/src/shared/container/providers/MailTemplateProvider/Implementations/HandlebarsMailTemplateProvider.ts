import IMailTemplateProvider from "../Models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import handlebars from "handlebars";
import fs from "fs";

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
