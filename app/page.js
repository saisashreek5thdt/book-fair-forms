"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    logo: null,
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
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const addBookField = () => {
    if (formData.books.length < 15) {
      setFormData({ ...formData, books: [...formData.books, ""] });
    } else {
      alert("Maximum of 15 books can be added.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Form submitted successfully!");
    }, 2000);
  };

  return (
    <>
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
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-blue-500"
                >
                  <Upload className="w-6 h-6 text-gray-500" />
                  <span className="ml-2 text-gray-600">Upload Logo</span>
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
                <label className="block mb-2 font-medium">
                  Publisher Books
                </label>
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
                <Button
                  type="button"
                  onClick={addBookField}
                  className="w-full mt-2"
                >
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
    </>
  );
}
