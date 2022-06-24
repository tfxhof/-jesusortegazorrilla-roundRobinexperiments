import http from "../http-common";


async function upload (file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    let url = "/measurements/";
    url = url.concat("a");
    url = url.concat("/results/files");

    const res = await http.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    })
    // .then(response => {
    //     console.log("Return body: ")
    //     console.log(response.data.message)
    //     return response.data.message;
    // })

    let idResultFile = res.data;
    return idResultFile;

    // if (response.ok){
    //     let json = await response.json();
    //     console.log("Id del result file: ");
    //     console.log(json);
    //     return 1;
    // } else {
    //     console.log("Id del result file 2: ");
    // }

};

const getFiles = () => {
    let url = "/measurements/";
    url = url.concat("a");
    url = url.concat("/results/files");
    //url = url.concat("{id}");                                               //TODO: completar con el id
    return http.get(url);
};


export default {
    upload,
    getFiles,
};