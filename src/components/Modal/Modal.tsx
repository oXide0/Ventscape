import { memo, Fragment, useRef, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
	active: boolean;
	setActive: (active: boolean) => void;
	children: ReactNode;
	background?: string;
	handleClose?: () => void;
}

const Modal = memo(({ active, setActive, children, background = 'bg-white', handleClose }: ModalProps) => {
	const cancelButtonRef = useRef(null);

	const onClose = () => {
		setActive(false);
		if (handleClose) handleClose();
	};

	return (
		<Transition.Root show={active} as={Fragment}>
			<Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						>
							<Dialog.Panel
								className={`relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${background}`}
							>
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
});

export default Modal;
