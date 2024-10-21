import { useEffect} from 'react';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { createPortal } from 'react-dom';
import {Loader2} from 'lucide-react';


interface ModalProps {
    isLoading: boolean;
    onExit?: () => void;
  }
  
  const LoadingModal: React.FC<ModalProps> = ({isLoading}) => {
    useEffect(() => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if(isLoading){
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }else{
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        }
    }, [isLoading])
    return(<>
                {isLoading &&
                createPortal(
                    <MaxWidthWrapper>
                    <div className={`h-screen w-full fixed top-0 left-0 bg-black/60 z-[50]  flex justify-center items-center ${!isLoading ? "hidden" : ""}`}>
                        <Loader2 className='text-gray-100 animate-spin' size={64}/>
                    </div>
                    </MaxWidthWrapper>,
                    document.body
                )
            }
        
    </>)
}
export default LoadingModal;