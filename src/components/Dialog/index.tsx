import { type ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";

interface DialogProps {
    show: boolean;                // Se o modal está visível
    title: string;                // Título do modal
    children?: ReactNode;         // Conteúdo (formulários, textos, etc)
    onClose: () => void;          // Função para fechar
    onConfirm?: () => void;       // Função para confirmar/Salvar
    confirmText?: string;         // Texto do botão confirmar
    cancelText?: string;          // Texto do botão cancelar
    size?: "sm" | "lg" | "xl";    // Tamanho opcional
}

export function Dialog({
    show,
    title,
    children,
    onClose,
    onConfirm,
    confirmText = "Salvar",
    cancelText = "Cancelar",
    size = "lg",
}: DialogProps) {
    return (
        <Modal
            show={show}
            onHide={onClose}
            size={size}
            centered
            contentClassName="bg-dark text-light rounded-3 shadow-lg"
        >
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{children}</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    {cancelText}
                </Button>
                {onConfirm && (
                    <Button variant="primary" onClick={onConfirm}>
                        {confirmText}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
