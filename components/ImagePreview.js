
const ImagePreview =({data}) =>{
    console.log(data)
        return (
            <>
               <img 
                style={{width:'33%',height:'150px', padding:'30px', overflow:'hidden',}}
                src={data} />
            </>)
}
export default ImagePreview;