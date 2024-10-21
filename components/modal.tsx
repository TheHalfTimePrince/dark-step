
import { useEffect} from 'react';
import MaxWidthWrapper from './max-width-wrapper';
import { createPortal } from 'react-dom';


interface ModalProps {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    onExit?: () => void;
  }
  
  const Modal: React.FC<ModalProps> = ({children, className, isOpen, onExit}) => {
    useEffect(() => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if(isOpen){
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }else{
            document.body.style.overflow = 'auto';
        }
    }, [isOpen])
    return(<>
                {isOpen &&
                createPortal(
                    <MaxWidthWrapper>
                    <div className={`h-screen w-full fixed top-0 left-0 z-[50]  flex justify-center items-center ${!isOpen ? "hidden" : ""}`}>
                        <div className={`z-50 bg-white/40 h-full w-full relative flex justify-center items-center ${className}`} onClick={onExit}>
                            <div className='pointer-events-none'>                    
                            {children}
                            </div>
                        </div>
                    </div>
                    </MaxWidthWrapper>,
                    document.body
                )
            }
        
    </>)
}
export default Modal;