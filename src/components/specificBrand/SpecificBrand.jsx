import axios from 'axios';
import { Watch } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function SpecificBrand() {
    const {_id} = useParams();

    function getSpecificBrand() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${_id}`)
            .then((response) => response.data);
    }

    const { data, isLoading, isError } = useQuery(`specificBrand-${_id}`, getSpecificBrand);

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
            <div className="row justify-content-center mt-5 mb-5">
                <div className='col-md-6'>
                    <div className="card shadow">
                        <div className="card-body">
                            <img className='w-100' src={data.data.image} alt={data.slug} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
