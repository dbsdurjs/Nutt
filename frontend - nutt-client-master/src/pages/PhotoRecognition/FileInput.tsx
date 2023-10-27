import {
  FormControl,
  Input,
  Image,
  FormLabel,
  Icon,
  Button,
  Spacer,
  Text,
  Center,
  Spinner,
  VStack,
  useToast,
  AspectRatio,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DETECTED_FOODS } from "../../store/reducers/DetectedFoodsReducer";
import { DETECTING_IMAGE } from "../../store/reducers/DetectingImage";

export default function FileInput() {
  const [imgFile, setImgFile] = useState<null | string | ArrayBuffer>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imgRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    if (
      imgRef.current &&
      imgRef.current.files &&
      imgRef.current.files?.length > 0
    ) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
      };
    }
  };

  return (
    <>
      <form>
        <FormControl>
          <FormLabel
            width="full"
            borderRadius="lg"
            padding={4}
            backgroundColor="gray.100"
            fontWeight="semibold"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
          >
            <Icon as={MdOutlineFileUpload} /> 이미지 업로드
          </FormLabel>
          <Input
            type="file"
            ref={imgRef}
            onChange={saveImgFile}
            display="none"
          />
          <Center
            padding={2}
            borderColor="gray.100"
            borderWidth={1}
            borderRadius="lg"
          >
            {!imgFile ? (
              <VStack paddingTop={8} paddingBottom={8} spacing={4}>
                <Spinner />
                <Text>업로드 대기 중</Text>
              </VStack>
            ) : (
              <AspectRatio ratio={1} width="full" maxHeight={200}>
                <Image src={imgFile as string} />
              </AspectRatio>
            )}
          </Center>
        </FormControl>
      </form>
      <Spacer />
      <Button
        type="submit"
        colorScheme="green"
        size="lg"
        minHeight={12}
        isLoading={isSubmitting}
        loadingText="인식 중"
        onClick={() => {
          if (imgFile === "") {
            if (!toast.isActive("no-image")) {
              toast({
                id: "no-image",
                title: "이미지 인식 실패",
                description: "이미지를 업로드해주세요",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            }
            return;
          }
          const formData = new FormData();
          formData.append("image", imgFile as string);

          dispatch({
            type: DETECTING_IMAGE,
            payload: { image: imgFile as string },
          });

          setIsSubmitting(true);
          axios({
            method: "post",
            url: `${process.env.REACT_APP_PHOTO_DETECTION_URL}/predict`,
            data: {
              file: imgFile,
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then((res) => {
              setIsSubmitting(false);
              const { data } = res;
              if (data.length === 0) {
                if (!toast.isActive("no-foods-detected")) {
                  toast({
                    id: "no-foods-detected",
                    title: "식단을 인식하지 못했습니다",
                    description: "재촬영 후 다시 시도해주세요",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                }
                return;
              }
              dispatch({
                type: DETECTED_FOODS,
                payload: data,
              });
              navigate("/analysis");
            })
            .catch((error) => {
              setIsSubmitting(false);
              if (!toast.isActive("submit-error")) {
                toast({
                  id: "submit-error",
                  title: "사진을 제출하지 못했습니다",
                  description: "잠시후 다시 시도해주세요",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                  position: "top",
                });
              }
            });
        }}
      >
        전송
      </Button>
    </>
  );
}
