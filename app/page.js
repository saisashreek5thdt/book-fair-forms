"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    logo: null,
    logoPreview: null, // Store preview URL
    publisherName: "",
    publisherEmail: "",
    boothNumber: "",
    books: [""],
  });

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const books = [...formData.books];
      books[index] = e.target.value;
      setFormData({ ...formData, books });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        logo: file,
        logoPreview: URL.createObjectURL(file), // Create preview URL
      });
    }
  };

  const addBookField = () => {
    if (formData.books.length < 15) {
      setFormData({ ...formData, books: [...formData.books, ""] });
    } else {
      toast("You have reached the limit.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("publisherName", formData.publisherName);
    formDataToSend.append("publisherEmail", formData.publisherEmail);
    formDataToSend.append("boothNumber", formData.boothNumber);
    formDataToSend.append("logo", formData.logo);
    formDataToSend.append("books", JSON.stringify(formData.books));

    try {
      const response = await fetch("http://localhost:5500/publishers", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast("Publisher added successfully!", { type: "success" });
        setFormData({
          logo: null,
          logoPreview: null, // Clear preview on reset
          publisherName: "",
          publisherEmail: "",
          boothNumber: "",
          books: [""],
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast(`Error: ${error.message}`, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen bg-gray-100 p-6"
    >
      <Card className="max-w-lg w-full p-6 bg-white shadow-lg rounded-2xl">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Publisher Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Publisher Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-blue-500"
              >
                {formData.logoPreview ? (
                  <img
                    src={formData.logoPreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-gray-500" />
                    <span className="ml-2 text-gray-600">Upload Logo</span>
                  </>
                )}
              </label>
            </div>
            <Input
              name="publisherName"
              placeholder="Publisher Name"
              value={formData.publisherName}
              onChange={handleChange}
              required
            />
            <Input
              name="publisherEmail"
              placeholder="Publisher Email"
              value={formData.publisherEmail}
              onChange={handleChange}
              required
            />
            <Input
              name="boothNumber"
              placeholder="Booth Number"
              value={formData.boothNumber}
              onChange={handleChange}
              required
            />
            <div>
              <label className="block mb-2 font-medium">Publisher Books</label>
              {formData.books.map((book, index) => (
                <Input
                  key={index}
                  placeholder={`Book ${index + 1}`}
                  value={book}
                  onChange={(e) => handleChange(e, index)}
                  className="mb-2"
                  required
                />
              ))}
              <Button type="button" onClick={addBookField} className="w-full mt-2">
                + Add Book
              </Button>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
