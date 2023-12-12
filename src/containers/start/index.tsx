import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Start from "@/components/Start";
import { useAppDispatch } from "@/utils/hooks";
import { startService } from "./service";

export const StartContainer: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleStart = () => {
    dispatch(startService(navigate));
  };

  return <Start handleStart={handleStart} />;
};
