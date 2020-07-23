import IMailTemplateProvider from "../Models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return "template";
  }
}

export default FakeMailTemplateProvider;
