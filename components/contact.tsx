"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  company: z.string().optional(),
  services: z
    .array(z.string())
    .min(1, { message: "Please select at least one service" }),
  budget: z.string({ required_error: "Please select a budget range" }),
  message: z
    .string()
    .min(10, { message: "Message should be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      services: [],
      budget: "",
      message: "",
    },
  });

  const serviceOptions = [
    { value: "mobile-app", label: "Mobile App" },
    { value: "website-design", label: "Website Design" },
    { value: "branding", label: "Branding" },
    { value: "web-development", label: "Web Development" },
    { value: "marketing", label: "Marketing Strategy" },
  ];

  const budgetOptions = [
    { value: "1k-5k", label: "$1k - $5k" },
    { value: "5k-10k", label: "$5k - $10k" },
    { value: "10k-20k", label: "$10k - $20k" },
    { value: "20k-50k", label: "$20k - $50k" },
    { value: "50k+", label: ">$50k" },
  ];

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      console.log("Form data:", data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      reset();

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl md:text-7xl text-center font-bold mb-4">
            <span className="text-gray-400">Say Hi!</span> and tell us about
            your idea
          </h1>
          <p className="text-gray-600 text-center">
            Have a nice works? Reach out and let&apos;s chat.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name*
            </label>
            <input
              id="name"
              type="text"
              placeholder="Hello..."
              className={`w-full px-4 py-3 border-b ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:border-black outline-none transition-colors`}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email*
            </label>
            <input
              id="email"
              type="email"
              placeholder="Where can we reply?"
              className={`w-full px-4 py-3 border-b ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-black outline-none transition-colors`}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company Name
            </label>
            <input
              id="company"
              type="text"
              placeholder="Your company or website?"
              className="w-full px-4 py-3 border-b border-gray-300 focus:border-black outline-none transition-colors"
              {...register("company")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              What&apos;s in your mind?*
            </label>
            <Controller
              control={control}
              name="services"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`inline-flex items-center px-4 py-2 rounded-full border cursor-pointer transition-colors ${
                        field.value.includes(option.value)
                          ? "bg-black text-white border-black"
                          : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={field.value.includes(option.value)}
                        onChange={(e) => {
                          const value = e.target.value;
                          const newValues = e.target.checked
                            ? [...field.value, value]
                            : field.value.filter((val) => val !== value);
                          field.onChange(newValues);
                        }}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.services && (
              <p className="mt-1 text-sm text-red-500">
                {errors.services.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              How much your budget range?*
            </label>
            <Controller
              control={control}
              name="budget"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`inline-flex items-center px-4 py-2 rounded-full border cursor-pointer transition-colors ${
                        field.value === option.value
                          ? "bg-black text-white border-black"
                          : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.budget && (
              <p className="mt-1 text-sm text-red-500">
                {errors.budget.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message*
            </label>
            <textarea
              id="message"
              placeholder="I want to build some..."
              rows={4}
              className={`w-full px-4 py-3 border-b ${
                errors.message ? "border-red-500" : "border-gray-300"
              } focus:border-black outline-none transition-colors`}
              {...register("message")}
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-black text-white rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
              {!isSubmitting && <ArrowRight size={16} />}
            </button>

            {isSuccess && (
              <p className="mt-4 text-green-600">
                Thank you for your message! We&apos;ll get back to you soon.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
