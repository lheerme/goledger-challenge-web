import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AddNewArtistDialogForm } from "./add-new-artist-dialog-form";

export function AddNewArtistDialog() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="inset-0 fixed bg-zinc-950/70 z-[1]" />
      <Dialog.Content 
        aria-describedby={undefined}
        className="fixed z-[2] overflow-hidden inset-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full bg-zinc-950 rounded-lg flex flex-col outline-none p-6 ring-1 ring-violet-400 space-y-4"
      >
        <Dialog.Title className="text-lg font-medium leading-none">Adicionar artista</Dialog.Title>
        <Dialog.Close className="absolute right-6 top-2 hover:text-violet-400 transition-colors">
          <X className="size-4" />
        </Dialog.Close>
        <AddNewArtistDialogForm />
      </Dialog.Content>
    </Dialog.Portal>
  )
}