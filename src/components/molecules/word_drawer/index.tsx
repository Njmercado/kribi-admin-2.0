import { Drawer } from '@/components/atom'
import { DrawerDirection } from '../../atom/drawer'
import { WordDTO, WordType } from "@/models";

export type ActionType = 'ADD' | 'UPDATE';

export interface WordDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: WordDTO;
  onSubmit?: (form: WordDTO) => void;
  action: ActionType;
  direction?: DrawerDirection;
}

export default function WordDrawer({
  isOpen,
  onClose,
  data,
  onSubmit,
  direction
}: WordDrawerProps) {

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const word = formData.get('word') as string;
    const type = formData.get('type') as string;
    const translations = formData.get('translations') as string;
    const definitions = formData.get('definitions') as string;
    const examples = formData.get('examples') as string;
    const language = formData.get('language') as 'spanish' | 'palenque';
    onSubmit?.(
      {
        ...data,
        word,
        type: type as WordType,
        translations: translations.split(','),
        definitions: definitions.split(','),
        examples: examples.split(','),
        language,
      },
    );
  }

  return (
    <Drawer
      direction={direction ?? DrawerDirection.BOTTOM_TO_TOP}
      isOpen={isOpen}
      onClose={onClose}
    >
      <article className="drawer-content">
        <section className="flex flex-col gap-2 p-2">
          <h2 className="text-2xl font-bold text-center">Add Word</h2>
          <form method="post" className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
            <input type="text" name="word" placeholder="Word" className="rounded-md border-solid border-black border-2" defaultValue={data.word} />
            <select name="language" defaultValue={data.language ?? 'palenque'}>
              <option value="spanish">Espanol</option>
              <option value="palenque">Palenque</option>
            </select>
            <select name="type" className="rounded-md border-solid border-black border-2" defaultValue={data.type}>
              <option value="noun">sustantivo</option>
              <option value="verb">verbo</option>
              <option value="adjective">adjetivo</option>
              <option value="adverb">adverbio</option>
              <option value="preposition">preposición</option>
              <option value="conjunction">conjunción</option>
              <option value="interjection">interjección</option>
              <option value="article">artículo</option>
              <option value="other">otro</option>
            </select>
            <input type="text" name="translations" placeholder="Translations" className="rounded-md border-solid border-black border-2" defaultValue={data.translations.join(',')} />
            <input type="text" name="definitions" placeholder="Definitions" className="rounded-md border-solid border-black border-2" defaultValue={data.definitions.join(',')} />
            <input type="text" name="examples" placeholder="Examples" className="rounded-md border-solid border-black border-2" defaultValue={data.examples.join(',')} />
            <button formAction='submit' className="rounded-md bg-blue-400 p-2 text-white font-bold">submit</button>
          </form>
        </section>
      </article>
    </Drawer>
  );
}