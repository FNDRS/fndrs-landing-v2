"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight } from "lucide-react";
import { contactFormText } from "@/constants/contact-translations";
import { useLanguage } from "@/hooks/use-language";
import { useAnalytics, usePostHog } from "@/hooks/use-posthog";
import axios from "axios";
import { MotionDiv, MotionForm } from "./ui/motion-client";
import { getContactFormSchema } from "@/schemas/contact-form.schema";

const ContactForm = () => {
  const { language } = useLanguage();
  const { trackContactFormSubmission, trackNewUserSignup } = useAnalytics();
  const { identifyUser, setUserProperties } = usePostHog();
  const t = contactFormText[language as keyof typeof contactFormText];
  const formSchema = getContactFormSchema(t);

  type FormValues = z.infer<typeof formSchema>;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      company: "",
      services: [],
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues): Promise<void> => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/contact", data);

      // Track successful form submission
      trackContactFormSubmission({
        name: data.name,
        email: data.email,
        company: data.company,
        services: data.services,
        budget: data.budget,
      });

      // Track as new user signup
      trackNewUserSignup("contact_form");

      // Identify user for future tracking
      identifyUser(data.email, {
        email: data.email,
        name: data.name,
        company: data.company,
        language: language,
      });

      // Set additional user properties
      setUserProperties({
        services_interested: data.services,
        budget_range: data.budget,
        contact_method: "contact_form",
        language: language,
      });

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Track failed submission
      trackContactFormSubmission({
        name: data.name,
        email: data.email,
        company: data.company,
        services: data.services,
        budget: data.budget,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-20 pt-20 overflow-hidden">
      <MotionDiv
        className="max-w-2xl mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-7xl text-center font-bold mb-4">
          <span className="text-gray-400">{t.titleAccent}</span> {t.titleRest}
        </h1>
        <p className="text-gray-600 text-center mb-10">{t.subtitle}</p>

        <MotionForm
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {t.nameLabel}
            </label>
            <input
              id="name"
              type="text"
              placeholder={t.namePlaceholder}
              className={`w-full px-4 py-3 border-b bg-white ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:border-black outline-none transition-colors`}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t.emailPlaceholder}
              className={`w-full px-4 py-3 border-b bg-white ${
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

          {/* Phone */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium mb-2"
            >
              {t.phoneLabel}
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder={t.phonePlaceholder}
              className={`w-full px-4 py-3 border-b bg-white ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } focus:border-black outline-none transition-colors`}
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              {t.companyLabel}
            </label>
            <input
              id="company"
              type="text"
              placeholder={t.companyPlaceholder}
              className="w-full px-4 py-3 border-b bg-white border-gray-300 focus:border-black outline-none transition-colors"
              {...register("company")}
            />
          </div>

          {/* Services */}
          <div>
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
          </div>

          {/* Budget */}
          <div>
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
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              {t.messageLabel}
            </label>
            <textarea
              id="message"
              placeholder={t.messagePlaceholder}
              rows={4}
              className={`w-full px-4 py-3 border-b bg-white ${
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

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-black text-white rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? t.submitting : t.submit}
              {!isSubmitting && <ArrowRight size={16} />}
            </button>

            {isSuccess && <p className="mt-4 text-green-600">{t.success}</p>}
          </div>
        </MotionForm>
      </MotionDiv>
    </section>
  );
};

export default ContactForm;
