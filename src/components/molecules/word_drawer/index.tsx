import { Drawer } from '../../atom'
import { DrawerDirection } from '../../atom/drawer'

export interface WordDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WordDrawer({
  isOpen,
  onClose,
}: WordDrawerProps) {
  return (
    <Drawer
      direction={DrawerDirection.BOTTOM_TO_TOP}
      isOpen={isOpen}
      onClose={onClose}
    >
      <article className="drawer-content">
        <section className="flex flex-col gap-2 p-2">
          <h2 className="text-2xl font-bold text-center">Add Word</h2>
          <form method="post" className="flex flex-col gap-2">
            <input type="text" name="word" placeholder="Word" className="rounded-md border-solid border-black border-2"/>
            <input type="text" name="type" placeholder="Type" className="rounded-md border-solid border-black border-2"/>
            <input type="text" name="translations" placeholder="Translations" className="rounded-md border-solid border-black border-2"/>
            <input type="text" name="definitions" placeholder="Definitions" className="rounded-md border-solid border-black border-2"/>
            <input type="text" name="examples" placeholder="Examples" className="rounded-md border-solid border-black border-2"/>
            <button formAction='submit' className="rounded-md bg-blue-400 p-2 text-white font-bold">Add Word</button>
          </form>
        </section>
      </article>
    </Drawer>
  );
}