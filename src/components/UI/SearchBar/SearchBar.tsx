import { memo, useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { RxSlash } from 'react-icons/rx';
import Fuse from 'fuse.js';
import { Link } from 'react-router-dom';
import { pages } from 'utils/pages';
import Modal from 'components/Modal/Modal';

const SearchBar = memo(() => {
	const [modalActive, setModalActive] = useState(false);
	const [search, setSearch] = useState<string>('');
	const fuse = new Fuse(pages, { keys: ['name'] });
	const results = fuse.search(search);

	const hanldeClose = () => {
		setModalActive(false);
		setSearch('');
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === '/') {
			setModalActive(true);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [modalActive]);

	return (
		<>
			<Modal active={modalActive} setActive={setModalActive} background='bg-gray-700' handleClose={hanldeClose}>
				<input
					type='text'
					placeholder='Search content...'
					className='bg-gray-700 text-white outline-none px-4 py-2 w-full rounded-lg border-2 border-gray-600 hover:border-gray-400 cursor-pointer transition-colors duration-200'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div className='flex flex-col' onClick={hanldeClose}>
					<p className='p-3 font-bold'>Content</p>
					{results.length ? (
						results.map((result) => {
							return (
								<Link
									to={result.item.path}
									key={result.item.id}
									className='border-y border-gray-600 p-2 hover:bg-gray-600 '
								>
									{result.item.name}
								</Link>
							);
						})
					) : (
						<p className='text-sm p-5'>No results</p>
					)}
				</div>
			</Modal>
			<GoSearch className='absolute w-6 h-6 text-gray-300 top-2 left-3' />
			<div
				className='bg-gray-700 outline-none px-12 py-2 w-full rounded-lg border-2 border-gray-600 hover:border-gray-400 cursor-pointer transition-colors duration-200 text-gray-400'
				onClick={() => setModalActive(true)}
			>
				Search content...
			</div>
			<button className='absolute w-6 h-6 flex justify-center items-center text-gray-300 right-5 top-2 mt-0.5 bg-gray-600 rounded-lg border border-gray-500 p-1 hover:bg-gray-700 transition-colors duration-200'>
				<RxSlash />
			</button>
		</>
	);
});

export default SearchBar;
