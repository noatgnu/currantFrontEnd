export class Coral {
  name: string = ""
  description: string = ""
  constructor(name: string, description: string) {
    this.name = name
    this.description = description
  }
  files: any[] = []
  operations: any[] = []
  operationSequences: any[] = []
  addFile(file: any) {
    this.files.push(file)
  }
  addOperation(operation: any) {
    this.operations.push(operation)
  }
  addOperationSequence(operationSequence: any) {
    this.operationSequences.push(operationSequence)
  }

  removeFile(file: any) {
    this.files = this.files.filter((f) => f !== file)
  }
  removeOperation(operation: any) {
    this.operations = this.operations.filter((o) => o !== operation)
  }
  removeOperationSequence(operationSequence: any) {
    this.operationSequences = this.operationSequences.filter((os) => os !== operationSequence)
  }

  restoreCoral(genericObject: any) {
    this.name = genericObject.name
    this.description = genericObject.description
    this.files = genericObject.files
    this.operations = genericObject.operations
    this.operationSequences = genericObject.operationSequences
  }
}
