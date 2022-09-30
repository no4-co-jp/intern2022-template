/**
 * 確認モーダル
 */
import type React from "react";
import { memo, useCallback } from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: (isOk: boolean) => void;
  message: string;
  positiveButtonLabel?: string;
  negativeButtonLabel?: string;
};

export const ConfirmModal: React.FC<Props> = memo(
  ({
    isOpen,
    onClose,
    message,
    positiveButtonLabel = "OK",
    negativeButtonLabel = "キャンセル",
  }) => {
    const handleClickPositiveButton = useCallback<() => void>(() => {
      onClose(true);
    }, [onClose]);

    const handleClickNegativeButton = useCallback<() => void>(() => {
      onClose(false);
    }, [onClose]);

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => <></>}
        blockScrollOnMount={true}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            sx={{
              padding: "24px 24px 0px",
            }}
          >
            <Text
              sx={{
                textAlign: "center",
                color: "#000",
              }}
            >
              {message}
            </Text>
          </ModalBody>

          <ModalFooter
            sx={{
              padding: "16px 24px 24px",
            }}
          >
            <Flex
              sx={{
                width: "100%",
                justifyContent: "center",
                gap: "32px",
              }}
            >
              <Button colorScheme="red" onClick={handleClickPositiveButton}>
                <Text>{positiveButtonLabel}</Text>
              </Button>
              <Button colorScheme="gray" onClick={handleClickNegativeButton}>
                <Text>{negativeButtonLabel}</Text>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
);
