import { useNavigate } from "react-router-dom";

const Logo=()=>{
       
    const navigate = useNavigate();

    return  <div onClick={() => navigate("/")} className="mb-8 flex cursor-pointer items-center gap-2">
          <span className="text-xl font-semibold tracking-tight">
            <img
              src="Gemini_Generated_Image_97y8ep97y8ep97y8.png"
              alt="Logo 1"
              className="h-9 w-auto cursor-pointer"
            />
          </span>
        </div>
}

export default Logo;