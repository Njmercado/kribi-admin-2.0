import { SUBMIT_ACTIONS, SubmitAction } from '@/contants';
import { Drawer } from '../../atom'
import { DrawerDirection } from '../../atom/drawer'
import { SpanishWordDTO, WordDTO } from "@/models";

export interface WordDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: WordDTO;
  onSubmit?: (form: SpanishWordDTO, action: SubmitAction) => void;
}

export default function WordDrawer({
  isOpen,
  onClose,
  data,
  onSubmit
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
    if (onSubmit) {
      onSubmit(
        {
          _id: data._id as string,
          palabra: word,
          tipo: type,
          traducciones: translations.split(','),
          definicion: definitions.split(','),
          ejemplos: examples.split(','),
        },
        data._id == -1 ? SUBMIT_ACTIONS.ADD : SUBMIT_ACTIONS.UPDATE
      );
    }
  }

  return (
    <Drawer
      direction={DrawerDirection.BOTTOM_TO_TOP}
      isOpen={isOpen}
      onClose={onClose}
    >
      <article className="drawer-content">
        <section className="flex flex-col gap-2 p-2">
          <h2 className="text-2xl font-bold text-center">Add Word</h2>
          <form method="post" className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
            <input type="text" name="word" placeholder="Word" className="rounded-md border-solid border-black border-2" defaultValue={data.word} />
            <input type="text" name="type" placeholder="Type" className="rounded-md border-solid border-black border-2" defaultValue={data.type} />
            <input type="text" name="translations" placeholder="Translations" className="rounded-md border-solid border-black border-2" defaultValue={data.translations.join(',')} />
            <input type="text" name="definitions" placeholder="Definitions" className="rounded-md border-solid border-black border-2" defaultValue={data.definitions.join(',')} />
            <input type="text" name="examples" placeholder="Examples" className="rounded-md border-solid border-black border-2" defaultValue={data.examples.join(',')} />
            <button formAction='submit' className="rounded-md bg-blue-400 p-2 text-white font-bold">Add Word</button>
          </form>
        </section>
      </article>
    </Drawer>
  );
}