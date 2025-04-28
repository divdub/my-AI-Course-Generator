import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { toast } from 'react-hot-toast';
import Link from "next/link";

const CourseBasicInfo = ({ course, refreshData, edit = true }) => {
  // We'll use state to track if a dummy image has been selected
  const [useDummyImage, setUseDummyImage] = useState(false);
  const [dummyImagePath, setDummyImagePath] = useState("/course-cover.svg");
  
  useEffect(() => {
    if (course) {
      // If course has an image URL and we're not using a dummy image, display it
      if (!useDummyImage && course?.courseBanner) {
        setDummyImagePath(course.courseBanner);
      }
    }
  }, [course, useDummyImage]);

  // This function is now simplified to just select a dummy image
  const onFileSelected = async (event) => {
    // We're not actually uploading the file, just acknowledging the selection
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload an image file (jpg, jpeg, png).');
      return;
    }
    
    // Instead of uploading to Firebase, we just set the dummy image
    setUseDummyImage(true);
    // Update the database with the path to our dummy image
    await db.update(CourseList)
      .set({
        courseBanner: "/course-cover.svg" // Using the default dummy image
      })
      .where(eq(CourseList.id, course.id));
    
    toast.success('Course image updated with default image');
    
    // Refresh the data if needed
    if (refreshData) {
      refreshData(true);
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.course?.name}{" "}
            <span>
              {" "}
              {edit && <EditCourseBasicInfo
                course={course}
                refreshData={() => refreshData(true)}
              />}
            </span>{" "}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.course?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            {" "}
            <HiOutlinePuzzlePiece /> {course?.category}
          </h2>
          {!edit && <Link href={'/course/' + course?.courseId + '/start'}>
            <Button className="w-full mt-5 cursor-pointer"
            variant={'purple'}>Start</Button>
          </Link>}
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={'/971.jpg'}
              width={600}
              height={300}
              className="w-ful rounded-xl h-[250px] object-cover cursor-pointer"
            />
          </label>
          {edit &&
            <input
              hidden
              type="file"
              id="upload-image"
              className="opacity-0"
              onChange={onFileSelected}
            />
          }
          {edit && useDummyImage && 
            <p className="text-sm text-gray-500 mt-2 text-center">Using default course image</p>
          }
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;




// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { HiOutlinePuzzlePiece } from "react-icons/hi2";
// import EditCourseBasicInfo from "./EditCourseBasicInfo";
// import { Corben } from "next/font/google";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { date } from "drizzle-orm/mysql-core";
// import { storage } from "@/configs/firebaseConfig";
// import { db } from "@/configs/db";
// import { CourseList } from "@/configs/Schema";
// import { eq } from "drizzle-orm";
// import {toast} from 'react-hot-toast';
// import Link from "next/link";

// const CourseBasicInfo = ({ course, refreshData,edit=true }) => {
//   const [selectedFile, setSelectedFile] = useState();
//   useEffect(()=>{
//        if(course){
//         setSelectedFile(course?.courseBanner)
//        }
//   },[course])
//   const onFileSelected = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       // alert("No file selected.");
//       return;
//     }
//     // console.log(file);
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (!allowedTypes.includes(file.type)) {
//       // alert("Please upload an image file (jpg, jpeg, png).");
//       toast.error('Please upload an image file (jpg, jpeg, png).');
//       return;
//     }
//     setSelectedFile(URL.createObjectURL(file));
//     const fileName = Date.now() + ".jpg";
//     const storageRef = ref(storage, "ai-course/" + fileName);

//     await uploadBytes(storageRef, file)
//       .then((snapshot) => {
//         // console.log("file uploaded sucess");
//       })
//       .then((resp) => {
//         getDownloadURL(storageRef).then(async (downloadUrl) => {
//           console.log(downloadUrl);
//           await db.update(CourseList).set({
//             courseBanner:downloadUrl
//           }).where(eq(CourseList.id,course.id))

//         });
//       });
//   };

//   return (
//     <div className="p-10 border rounded-xl shadow-sm mt-5">
//       <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
//         <div>
//           <h2 className="font-bold text-3xl">
//             {course?.courseOutput?.course?.name}{" "}
//             <span>
//               {" "}
//           {edit &&<EditCourseBasicInfo
//                 course={course}
//                 refreshData={() => refreshData(true)}
//               />}
//             </span>{" "}
//           </h2>
//           <p className="text-sm text-gray-400 mt-3">
//             {course?.courseOutput?.course?.description}
//           </p>
//           <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
//             {" "}
//             <HiOutlinePuzzlePiece /> {course?.category}
//           </h2>
//          {!edit &&<Link href={'/course/'+course?.courseId+'/start'}>
//           <Button className="w-full mt-5 cursor-pointer">Start</Button>
//           </Link>}
//         </div>
//         <div>
//           <label htmlFor="upload-image">
//             <Image
//               src={selectedFile ? selectedFile : "/course-cover.svg"}
//               width={600}
//               height={300}
//               className="w-ful rounded-xl h-[250px] object-cover cursor-pointer"
//             />
//          </label>
//          {edit &&
//           <input
//             hidden
//             type="file"
//             id="upload-image"
//             className="opacity-0"
//             onChange={onFileSelected}
//           />
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseBasicInfo;