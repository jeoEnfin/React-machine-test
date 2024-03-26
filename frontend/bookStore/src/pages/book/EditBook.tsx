import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/services";
import { useNavigate, useParams } from "react-router-dom";



type Props = {}

function EditBook({ }: Props) {
    const {id} = useParams();
    console.log(id)
    const navigate = useNavigate();
    let [formData, setFormData] = useState({
        name: "",
        description: "",
        publishDate: "",
        image: "",
        price: ""
    });

    useEffect(() => {
        getBookDetails();
    },[])

    const getBookDetails = async ()=>{
        const user_token: any = localStorage.getItem('User');
        const userData = JSON.parse(user_token);
        const accessToken = userData.accessToken;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken}`);
        try {
            const response = await fetch(`${baseUrl}/api/books/${id}`, {
                method: "GET",
                headers: myHeaders,
            })
            
            if(response.ok){
                const data = await response.json();
                setFormData({
                    name: data.name,
                    description: data.description,
                    publishDate: data.publishDate,
                    image: data.image,
                    price: data.price
                })
            }

        }
        catch (err: any) {
            console.log(err.message)
        }
    }

    const handleOnChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        // console.log(name, value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const user_token: any = localStorage.getItem('User');
        const userData = JSON.parse(user_token);
        const accessToken = userData.accessToken;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken}`);
        try {
            const response = await fetch(`${baseUrl}/api/books/${id}`, {
                method: "PATCH",
                headers: myHeaders,
                body: JSON.stringify(formData)
            })
            console.log(response)
            if(response.ok){
                navigate('/');
            }

        }
        catch (err: any) {
            console.log(err.message)
        }
    };

    return (
        <>
            <div className="container-fluid ">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">

                        <form onSubmit={handleSubmit}>
                            <div className="row align-items-center my-4">
                                <div className="col">
                                    <h2 className="h3 mb-0 page-title">Edit Book</h2>
                                </div>
                                <div className="col-auto">
                                    <button onClick={()=>{navigate('/')}} type="button" className="btn btn-danger m-4">
                                        cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Update Change
                                    </button>
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="name">Book Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            name="name"
                                            onChange={handleOnChange}
                                            value={formData.name}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            rows={4}
                                            id="description"
                                            className="form-control"
                                            name="description"
                                            onChange={handleOnChange}
                                            value={formData.description}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="custom-zip">Publish Date</label>
                                        <input
                                            type="date"
                                            className="form-control input-zip"
                                            id="custom-zip"
                                            name='publishDate'
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="customFile">Image</label>
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                id="customFile"
                                                name="image"
                                                onChange={handleOnChange}
                                            />
                                            <label className="custom-file-label" htmlFor="customFile">{formData.image ? formData.image :'Choose file'}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputState5">Price</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">₹</span>
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control"
                                                aria-label="Amount (to the nearest dollar)"
                                                name="price"
                                                onChange={handleOnChange}
                                                value={formData.price}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>{" "}
                    {/* .col-12 */}
                </div>{" "}
                {/* .row */}
            </div>
        </>
    )
}

export default EditBook