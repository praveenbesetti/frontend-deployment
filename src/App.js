import { useState } from "react";
import { getS3Url, registerUser } from "./api";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    image: null,
  });

  const handleUpload = async () => {
  if (!form.image) return alert("Select image");

  // pass the file type to backend
  const { data } = await getS3Url(form.image.type);

  // upload with the correct content-type
  await fetch(data.uploadURL, {
    method: "PUT",
    headers: { "Content-Type": form.image.type },
    body: form.image,
  });

  return data.imageUrl;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleUpload();

    await registerUser({
      name: form.name,
      number: form.number,
      email: form.email,
      imageUrl,
    });
   console.log(imageUrl)
    alert("User Registered!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br/><br/>

        <input
          placeholder="Number"
          onChange={(e) => setForm({ ...form, number: e.target.value })}
        /><br/><br/>

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br/><br/>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        /><br/><br/>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
