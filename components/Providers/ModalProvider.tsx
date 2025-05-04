"use client";

import { createContext, ReactNode, useCallback, useState } from "react";

import { Loader2Icon } from "lucide-react";

import { Button } from "../ui/button";
import { HeaderInfo } from "../ui/headerInfo";

type ModalContextType = {
  openConfirmModal: (config: ConfirmModalConfig) => void;
  closeModal: () => void;
};

type ConfirmModalConfig = {
  title: string;
  description: string;
  onConfirm: (...args: []) => Promise<void> | void | unknown;
};

export const ModalCtx = createContext<ModalContextType>({
  closeModal: () => {},
  openConfirmModal: () => {},
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modalIsOpen, openModal] = useState(false);
  const [modalIsLoading, setModalIsLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState<ConfirmModalConfig | null>();

  const openConfirmModal = useCallback((config: ConfirmModalConfig) => {
    setModalConfig(config);
    openModal(true);
  }, []);

  async function handleConfirm() {
    if (!modalConfig?.onConfirm) return;

    setModalIsLoading(true);
    await modalConfig.onConfirm();
  }

  function closeModal() {
    setModalConfig(null);
    openModal(!modalIsOpen);
    setModalIsLoading(false);
  }

  return (
    <ModalCtx.Provider value={{ openConfirmModal, closeModal }}>
      {modalIsOpen && (
        <div
          className={`absolute inset-0 z-[100] flex h-full w-full items-center justify-center bg-background/85 transition-opacity duration-200`}
        >
          <div className="flex max-w-[400px] flex-col gap-y-4 rounded-sm border bg-background p-4">
            <HeaderInfo
              title={modalConfig?.title as string}
              description={modalConfig?.description as string}
            />

            <div className="flex items-center gap-x-4">
              <Button
                onClick={handleConfirm}
                disabled={modalIsLoading}
                className="flex basis-1/2 items-center gap-x-2 rounded-sm disabled:cursor-not-allowed"
              >
                Confirm{" "}
                {modalIsLoading && <Loader2Icon className="animate-spin" />}
              </Button>

              <Button
                onClick={closeModal}
                variant={"destructive"}
                disabled={modalIsLoading}
                className="basis-1/2 rounded-sm disabled:cursor-not-allowed"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {children}
    </ModalCtx.Provider>
  );
}
