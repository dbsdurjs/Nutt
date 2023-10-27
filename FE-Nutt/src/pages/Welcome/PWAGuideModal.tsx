import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  OrderedList,
  ListItem,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";
import { IoShareOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton";

function PWAGuideAccordion() {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Safari
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <OrderedList>
            <ListItem>
              Safari 도구 모음의 <Icon as={IoShareOutline} />을 누릅니다.
            </ListItem>
            <ListItem>
              <Text as="b">홈 화면에 추가</Text>를 눌러 바로가기를 추가합니다.
            </ListItem>
            <ListItem>홈 화면에 생성된 Nutt를 실행합니다.</ListItem>
          </OrderedList>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Chrome
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <OrderedList>
            <ListItem>
              Chrome 도구 모음의 <Icon as={AiOutlineMore} />을 누릅니다.
            </ListItem>
            <ListItem>
              <Text as="b">홈 화면에 추가</Text>를 눌러 바로가기를 추가합니다.
            </ListItem>
            <ListItem>홈 화면에 생성된 Nutt를 실행합니다.</ListItem>
          </OrderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

function PWAGuideModal() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <NavigateButton onClick={onOpen}>시작하기</NavigateButton>

      <Modal isOpen={isOpen} onClose={onClose} size={["xs", "md"]} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>PWA 활성화 안내</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              PWA를 지원하는 Nutt는 앱처럼 설치가 가능하며, 빠른 속도와 부드러운
              사용자 경험을 제공합니다. 다음 단계를 따라 PWA를 활성화해보세요.
            </Text>

            <br />
            <PWAGuideAccordion />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => {
                onClose();
                navigate("/signup");
              }}
            >
              완료
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PWAGuideModal;
