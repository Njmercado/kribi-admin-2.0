export default interface SpanishWordDTO {
  _id: string;
  palabra: string;
  definicion: string[];
  ejemplos: string[];
  tipo: string;
  traducciones: string[];
}