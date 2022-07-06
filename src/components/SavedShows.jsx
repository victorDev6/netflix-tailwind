import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { AiOutlineClose } from 'react-icons/ai';

const SavedShows = () => {
    const { user } = UserAuth();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc2) => {
            setMovies(doc2.data()?.savedShows);
        });
    }, [user?.email]);

    const slideLeft = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }
    
    const slideRight = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const movieRef = doc(db, 'users', `${user?.email}`);
    const deleteShow = async (id) => {
        try {
            const result = movies.filter((item) => item.id !== id);
            await updateDoc(movieRef, {
                savedShows: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={slideLeft} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor:pointer z-10 hidden group-hover:block' size={40} />
                <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {
                        movies?.map((movie, id) => (
                            <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                                <img className='w-full h-auto block' src={ `https://image.tmdb.org/t/p/w500/${ movie?.img }` } alt={movie?.title} />
                                <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                                    <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{ movie?.title }</p>
                                </div>
                                <p onClick={() => deleteShow(movie.id)} className="absolute text-gray-300 top-4 right-4">
                                    <AiOutlineClose />
                                </p>
                            </div>
                        ))
                    }
                </div>
                <MdChevronRight onClick={slideRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor:pointer z-10 hidden group-hover:block' size={40} />
            </div>
        </div>
    );
}

export default SavedShows;
