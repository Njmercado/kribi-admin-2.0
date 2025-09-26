import { WordDTO, WordType } from '@/models';

const WORD_EXAMPLES: {
  words: Array<WordDTO>
} = {
  "words": [
    {
      "id": 1,
      "word": "Example",
      "definitions": [
        "This is the first example definition.",
        "This is the second example definition."
      ],
      "examples": [
        "This is the first example of how the word is used.",
        "This is the second example of how the word is used."
      ],
      "translations": ["Ejemplo", "Exemplo"],
      "type": WordType.NOUN
    },
    {
      "id": 2,
      "word": "Sample",
      "definitions": [
        "This is the first sample definition.",
        "This is the second sample definition."
      ],
      "examples": [
        "This is the first sample of how the word is used.",
        "This is the second sample of how the word is used."
      ],
      "translations": ["Muestra", "Amostra"],
      "type": WordType.NOUN
    },
    {
      "id": 3,
      "word": "Test",
      "definitions": [
        "This is the first test definition.",
        "This is the second test definition."
      ],
      "examples": [
        "This is the first test of how the word is used.",
        "This is the second test of how the word is used."
      ],
      "translations": ["Prueba", "Teste"],
      "type": WordType.NOUN
    },
    {
      "id": 4,
      "word": "Demo",
      "definitions": [
        "This is the first demo definition.",
        "This is the second demo definition."
      ],
      "examples": [
        "This is the first demo of how the word is used.",
        "This is the second demo of how the word is used."
      ],
      "translations": ["Demostración", "Demonstração"],
      "type": WordType.NOUN
    },
    {
      "id": 5,
      "word": "Prototype",
      "definitions": [
        "This is the first prototype definition.",
        "This is the second prototype definition."
      ],
      "examples": [
        "This is the first prototype of how the word is used.",
        "This is the second prototype of how the word is used."
      ],
      "translations": ["Prototipo", "Protótipo"],
      "type": WordType.NOUN
    },
    {
      "id": 6,
      "word": "Mock",
      "definitions": [
        "This is the first mock definition.",
        "This is the second mock definition."
      ],
      "examples": [
        "This is the first mock of how the word is used.",
        "This is the second mock of how the word is used."
      ],
      "translations": ["Simulación", "Simulação"],
      "type": WordType.NOUN
    },
    {
      "id": 7,
      "word": "Template",
      "definitions": [
        "This is the first template definition.",
        "This is the second template definition."
      ],
      "examples": [
        "This is the first template of how the word is used.",
        "This is the second template of how the word is used."
      ],
      "translations": ["Plantilla", "Modelo"],
      "type": WordType.NOUN
    },
    {
      "id": 8,
      "word": "Blueprint",
      "definitions": [
        "This is the first blueprint definition.",
        "This is the second blueprint definition."
      ],
      "examples": [
        "This is the first blueprint of how the word is used.",
        "This is the second blueprint of how the word is used."
      ],
      "translations": ["Plano", "Planta"],
      "type": WordType.NOUN
    },
    {
      "id": 9,
      "word": "Guide",
      "definitions": [
        "This is the first guide definition.",
        "This is the second guide definition."
      ],
      "examples": [
        "This is the first guide of how the word is used.",
        "This is the second guide of how the word is used."
      ],
      "translations": ["Guía", "Guia"],
      "type": WordType.NOUN
    },
    {
      "id": 10,
      "word": "Manual",
      "definitions": [
        "This is the first manual definition.",
        "This is the second manual definition."
      ],
      "examples": [
        "This is the first manual of how the word is used.",
        "This is the second manual of how the word is used."
      ],
      "translations": ["Manual", "Manual"],
      "type": WordType.NOUN
    }
  ]
}

export default WORD_EXAMPLES;