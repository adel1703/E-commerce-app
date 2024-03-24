import axios from 'axios';
import { Watch } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function SpecificCategory() {
    const {_id} = useParams();

    function getSpecificCategory() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${_id}`)
            .then((response) => response.data);
    }

    const { data, isLoading, isError } = useQuery(`specificCategory-${_id}`, getSpecificCategory);

    if (isError) {
        return <div className='fs-3 text-center fw-bold text-warning mt-3'>Error loading data.</div>;
    }

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-4">
                <Watch
                    visible={true}
                    height="100"
                    width="100"
                    radius="48"
                    color="#0aad0a"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-5 mb-5">
                <div className='col bg-main p-2'>
                    <div>
                        <img className='w-100' src={data.data.image} alt={data.slug} />
                        <h5 className='text-center mt-3 fw-bold text-white fs-3' >{data.data.name}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
