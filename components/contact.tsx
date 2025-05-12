"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { contactFormText } from "@/constants/contact-translations";

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

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const ContactForm = () => {
  const lang = "es";
  const t = contactFormText[lang];

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

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-20 pt-20 overflow-hidden">
      <motion.div
        className="max-w-2xl mx-auto px-4 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={fadeIn} custom={0} className="mb-10">
          <h1 className="text-4xl md:text-7xl text-center font-bold mb-4">
            <span className="text-gray-400">{t.titleAccent}</span> {t.titleRest}
          </h1>
          <p className="text-gray-600 text-center">{t.subtitle}</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeIn} custom={1}>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {t.nameLabel}
            </label>
            <input
              id="name"
              type="text"
              placeholder={t.namePlaceholder}
              className={`w-full px-4 py-3 border-b ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:border-black outline-none transition-colors`}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </motion.div>

          <motion.div variants={fadeIn} custom={2}>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t.emailPlaceholder}
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
          </motion.div>

          <motion.div variants={fadeIn} custom={3}>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              {t.companyLabel}
            </label>
            <input
              id="company"
              type="text"
              placeholder={t.companyPlaceholder}
              className="w-full px-4 py-3 border-b border-gray-300 focus:border-black outline-none transition-colors"
              {...register("company")}
            />
          </motion.div>

          <motion.div variants={fadeIn} custom={4}>
            <label className="block text-sm font-medium mb-3">
              {t.servicesLabel}
            </label>
            <Controller
              control={control}
              name="services"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {t.serviceOptions.map((option) => (
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
          </motion.div>

          <motion.div variants={fadeIn} custom={5}>
            <label className="block text-sm font-medium mb-3">
              {t.budgetLabel}
            </label>
            <Controller
              control={control}
              name="budget"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {t.budgetOptions.map((option) => (
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
          </motion.div>

          <motion.div variants={fadeIn} custom={6}>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              {t.messageLabel}
            </label>
            <textarea
              id="message"
              placeholder={t.messagePlaceholder}
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
          </motion.div>

          <motion.div className="pt-4" variants={fadeIn} custom={7}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-black text-white rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? t.submitting : t.submit}
              {!isSubmitting && <ArrowRight size={16} />}
            </button>

            {isSuccess && <p className="mt-4 text-green-600">{t.success}</p>}
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default ContactForm;
