import { FC, PropsWithChildren } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { access } from "../constants/index";

type IProps = PropsWithChildren



const AuthRequired: FC<IProps> = ({ children }) => {

    const accessToken = localStorage.getItem(access);
    const navigate = useNavigate();
    useEffect(() => {
        if (!accessToken) {
            navigate('/auth/sign-in');
        }
    }, [accessToken, navigate]);
    return (
        <div>
            {children}
        </div>
    );
};

export { AuthRequired };