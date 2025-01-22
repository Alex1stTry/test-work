import { MyAccountComponent } from "../components/User/MyCurrentComponent";
import { useEffect, useState } from "react";
import { IResponseUser } from "../interfaces/index";
import { authService } from "../services/index";

const MyCurrentPage = () => {
    const [user, setUser] = useState<IResponseUser | null>(null)

    useEffect(() => {
        authService.me().then(({ data }) => {
            setUser(data)
        })
    }, [user])

    return (
        <div>
            {
                user && <MyAccountComponent user={user} />
            }
        </div>
    );
};

export { MyCurrentPage };