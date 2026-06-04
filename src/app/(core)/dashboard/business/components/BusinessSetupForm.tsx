"use client";
// Dependencies
import { useRef, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { businessApi } from "@/lib/api/business.api";
// Icons
import {
  Globe,
  Images,
  ImagePlus,
  Loader2,
  MapPin,
  Phone,
  Plus,
  Share2,
  Trash2,
  Upload,
  X,
  ChevronsUpDown,
  Check,
  ArrowRight,
  Link,
} from "lucide-react";
// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Schema
import {
  businessSetupSchema,
  type BusinessSetupValues,
} from "@/lib/schemas/businessSetupSchema";
// Utils
import { SOCIAL_PLATFORMS, MEXICAN_STATES } from "@/utils/utils";
// Hooks & store
import { useCreateBusiness, useUpdateBusiness } from "@/hooks/useBusiness";
import { useBusinessStore } from "@/store/business.store";

const buildSocialLinks = (links: { platform: string; url: string }[] | null | undefined) =>
  (links ?? []).map(link => {
    const platformInfo = SOCIAL_PLATFORMS.find(p => p.name === link.platform);
    const baseUrl = platformInfo?.baseUrl ?? "";
    return {
      platform: link.platform,
      url: baseUrl && link.url.startsWith(baseUrl) ? link.url.slice(baseUrl.length) : link.url,
    };
  });

function SectionHeader({
  icon: Icon,
  title,
  action,
}: {
  icon: React.ElementType;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="px-6 py-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-3.5 text-primary" />
        </div>
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      </div>
      {action}
    </div>
  );
}

const fieldLabel = "text-xs font-medium text-muted-foreground uppercase tracking-wide";
const inputClass = "bg-background border-border/80 focus-visible:ring-ring";

export default function BusinessSetupForm() {
  const business = useBusinessStore(state => state.business);
  const isEditing = !!business;

  const createBusiness = useCreateBusiness();
  const updateBusiness = useUpdateBusiness(business?.id ?? "");

  const form = useForm<BusinessSetupValues>({
    resolver: zodResolver(businessSetupSchema),
    defaultValues: business
      ? {
          name: business.name,
          description: business.description ?? "",
          phone_number: business.phone_number ?? "",
          website: business.website ?? "",
          street: business.street,
          external_number: business.external_number,
          internal_number: business.internal_number ?? "",
          neighborhood: business.neighborhood ?? "",
          city: business.city,
          state: business.state,
          zip_code: business.zip_code,
          country: business.country,
          social_links: buildSocialLinks(business.social_links),
          main_image_url: business.main_image_url ?? "",
          gallery_images: business.gallery_images ?? [],
        }
      : {
          name: "",
          description: "",
          phone_number: "",
          website: "",
          street: "",
          external_number: "",
          internal_number: "",
          neighborhood: "",
          city: "",
          state: "",
          zip_code: "",
          country: "México",
          social_links: [],
          main_image_url: "",
          gallery_images: [],
        },
  });

  const { reset } = form;
  const { isSubmitting } = form.formState;
  const watchedLinks = form.watch("social_links") ?? [];

  useEffect(() => {
    if (!business) return;

    reset({
      name: business.name,
      description: business.description ?? "",
      phone_number: business.phone_number ?? "",
      website: business.website ?? "",
      street: business.street,
      external_number: business.external_number,
      internal_number: business.internal_number ?? "",
      neighborhood: business.neighborhood ?? "",
      city: business.city,
      state: business.state,
      zip_code: business.zip_code,
      country: business.country,
      social_links: (business.social_links ?? []).map(link => {
        const platformInfo = SOCIAL_PLATFORMS.find(p => p.name === link.platform);
        const baseUrl = platformInfo?.baseUrl ?? "";
        return {
          platform: link.platform,
          url: baseUrl && link.url.startsWith(baseUrl) ? link.url.slice(baseUrl.length) : link.url,
        };
      }),
      main_image_url: business.main_image_url ?? "",
      gallery_images: business.gallery_images ?? [],
    });

    if (business.main_image_url) setImagePreview(business.main_image_url);
    if (business.gallery_images?.length) setGalleryPreviews(business.gallery_images);
  }, [business, reset]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "social_links",
  });

  // ── Imagen principal ──────────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    try {
      const { url } = await businessApi.uploadImage(file);
      form.setValue("main_image_url", url);
    } catch {
      toast.error("No se pudo subir la imagen. Inténtalo de nuevo.");
      handleRemoveImage();
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setValue("main_image_url", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Galería ───────────────────────────────────────────────────────────────
  const MAX_GALLERY = 5;
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const remaining = MAX_GALLERY - galleryPreviews.length;
    const selected = files.slice(0, remaining);
    const newPreviews = selected.map(f => URL.createObjectURL(f));
    setGalleryPreviews(prev => [...prev, ...newPreviews]);
    if (galleryInputRef.current) galleryInputRef.current.value = "";
    try {
      const results = await businessApi.uploadGallery(selected);
      const newUrls = results.map(r => r.url);
      const current = form.getValues("gallery_images") ?? [];
      form.setValue("gallery_images", [...current, ...newUrls]);
    } catch {
      toast.error("No se pudieron subir las imágenes. Inténtalo de nuevo.");
      setGalleryPreviews(prev => prev.slice(0, prev.length - newPreviews.length));
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    const current = form.getValues("gallery_images") ?? [];
    form.setValue("gallery_images", current.filter((_, i) => i !== index));
  };

  // ── Dropdown de estado ────────────────────────────────────────────────────
  const [stateOpen, setStateOpen] = useState(false);
  const [stateQuery, setStateQuery] = useState("");
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  const filteredStates = stateQuery.trim()
    ? MEXICAN_STATES.filter(s => s.toLowerCase().includes(stateQuery.toLowerCase()))
    : MEXICAN_STATES;

  useEffect(() => {
    if (!stateOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(e.target as Node)) {
        setStateOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [stateOpen]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = async (values: BusinessSetupValues) => {
    const payload = Object.fromEntries(
      Object.entries({
        ...values,
        social_links: values.social_links?.map(link => {
          const platformInfo = SOCIAL_PLATFORMS.find(p => p.name === link.platform);
          const baseUrl = platformInfo?.baseUrl ?? "";
          return { ...link, url: baseUrl ? baseUrl + link.url : link.url };
        }),
      }).filter(([, v]) => v !== "" && v !== undefined),
    ) as BusinessSetupValues;

    if (isEditing) {
      await updateBusiness.mutateAsync(payload);
    } else {
      await createBusiness.mutateAsync(payload);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

        {/* ── Sección 1: Información del negocio ── */}
        <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
          <SectionHeader icon={Globe} title="Información del negocio" />
          <div className="p-6 flex flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={fieldLabel}>
                    Nombre del negocio <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Mi negocio" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={fieldLabel}>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe tu negocio brevemente..."
                      className={`resize-none ${inputClass}`}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>
                      <span className="flex items-center gap-1.5">
                        <Phone className="size-3" />
                        Teléfono
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="5512345678" type="tel" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>
                      <span className="flex items-center gap-1.5">
                        <Link className="size-3" />
                        Sitio web
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://tunegocio.com" type="url" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* ── Sección 2: Dirección ── */}
        <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
          <SectionHeader icon={MapPin} title="Dirección" />
          <div className="p-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className={fieldLabel}>
                      Calle <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Av. Insurgentes" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="external_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>
                      No. Ext. <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="100" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="internal_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>No. Int.</FormLabel>
                    <FormControl>
                      <Input placeholder="A" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>Colonia</FormLabel>
                    <FormControl>
                      <Input placeholder="Centro" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>
                      Ciudad <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ciudad de México" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>
                      Estado <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative" ref={stateDropdownRef}>
                        <div className="relative">
                          <Input
                            placeholder="Buscar estado..."
                            value={stateOpen ? stateQuery : (field.value ?? "")}
                            onFocus={() => {
                              setStateQuery(field.value ?? "");
                              setStateOpen(true);
                            }}
                            onChange={e => {
                              setStateQuery(e.target.value);
                              field.onChange(e.target.value);
                              setStateOpen(true);
                            }}
                            onBlur={field.onBlur}
                            className={`pr-8 ${inputClass}`}
                          />
                          <ChevronsUpDown className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                        </div>
                        {stateOpen && filteredStates.length > 0 && (
                          <div className="absolute z-50 w-full mt-1 max-h-52 overflow-y-auto rounded-xl border bg-popover shadow-md">
                            {filteredStates.map(state => (
                              <button
                                key={state}
                                type="button"
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground text-left"
                                onMouseDown={e => {
                                  e.preventDefault();
                                  field.onChange(state);
                                  setStateQuery(state);
                                  setStateOpen(false);
                                }}
                              >
                                <Check
                                  className={`size-4 shrink-0 ${field.value === state ? "opacity-100" : "opacity-0"}`}
                                />
                                {state}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zip_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>
                      C.P. <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="06600" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="max-w-xs">
                  <FormLabel className={fieldLabel}>País</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="México"
                      className="bg-muted/60 border-border/40 text-muted-foreground cursor-not-allowed"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ── Sección 3: Redes sociales ── */}
        <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
          <SectionHeader
            icon={Share2}
            title="Redes sociales"
            action={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => append({ platform: "", url: "" })}
              >
                <Plus className="size-3.5" />
                Agregar
              </Button>
            }
          />
          <div className="p-6">
            {fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                <div className="rounded-full bg-muted p-4">
                  <Share2 className="size-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Sin redes sociales</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Agrega tus redes para que los clientes puedan encontrarte.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 mt-1"
                  onClick={() => append({ platform: "", url: "" })}
                >
                  <Plus className="size-3.5" />
                  Agregar red social
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {fields.map((field, index) => {
                  const currentPlatform = watchedLinks[index]?.platform;
                  const platformInfo = SOCIAL_PLATFORMS.find(p => p.name === currentPlatform);
                  const prefix = platformInfo?.baseUrl ?? "";
                  const inputPlaceholder = platformInfo?.placeholder ?? "usuario";

                  return (
                    <div
                      key={field.id}
                      className="flex flex-col gap-2 rounded-xl border border-border/60 bg-muted/30 p-3"
                    >
                      {/* Fila 1: selector de plataforma + botón eliminar */}
                      <div className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`social_links.${index}.platform`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={`w-full ${inputClass}`}>
                                    <SelectValue placeholder="Seleccionar plataforma" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {SOCIAL_PLATFORMS.map(p => (
                                      <SelectItem key={p.name} value={p.name}>
                                        {p.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                          onClick={() => remove(index)}
                          aria-label={`Eliminar red social ${index + 1}`}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>

                      {/* Fila 2: URL (ancho completo) */}
                      <FormField
                        control={form.control}
                        name={`social_links.${index}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              {prefix ? (
                                <div className="flex items-center rounded-md border border-border/80 bg-background focus-within:ring-1 focus-within:ring-ring overflow-hidden">
                                  <span className="px-2.5 py-2 text-xs text-muted-foreground bg-muted border-r border-border/60 whitespace-nowrap shrink-0 select-none">
                                    {prefix}
                                  </span>
                                  <Input
                                    placeholder={inputPlaceholder}
                                    className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none bg-background"
                                    {...field}
                                  />
                                </div>
                              ) : (
                                <Input placeholder={inputPlaceholder} className={inputClass} {...field} />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Sección 4: Imagen principal ── */}
        <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
          <SectionHeader icon={ImagePlus} title="Imagen principal" />
          <div className="p-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <div className="relative w-full rounded-xl overflow-hidden border border-border/60 aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Vista previa de imagen principal"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 size-7 rounded-full bg-background/80 hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Eliminar imagen principal"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors py-10 cursor-pointer group"
                aria-label="Seleccionar imagen principal"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                  <Upload className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-0.5 text-center">
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    Haz clic para seleccionar una imagen
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    PNG, JPG, WEBP — máx. recomendado 2 MB
                  </p>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* ── Sección 5: Galería ── */}
        <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
          <SectionHeader
            icon={Images}
            title="Galería de imágenes"
            action={
              <span className="text-xs text-muted-foreground tabular-nums">
                {galleryPreviews.length}/{MAX_GALLERY}
              </span>
            }
          />
          <div className="p-6">
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleGalleryChange}
            />
            {galleryPreviews.length === 0 ? (
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors py-10 cursor-pointer group"
                aria-label="Seleccionar imágenes para galería"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                  <Images className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-0.5 text-center">
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    Haz clic para agregar imágenes
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Hasta {MAX_GALLERY} imágenes — PNG, JPG, WEBP
                  </p>
                </div>
              </button>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {galleryPreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden border border-border/60"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Imagen de galería ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(index)}
                      className="absolute top-1.5 right-1.5 size-6 rounded-full bg-background/80 hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors shadow-sm"
                      aria-label={`Eliminar imagen ${index + 1} de la galería`}
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
                {galleryPreviews.length < MAX_GALLERY && (
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="aspect-square flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
                    aria-label="Agregar más imágenes a la galería"
                  >
                    <Plus className="size-5" />
                    <span className="text-xs">Agregar</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Submit ── */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full gap-2 font-medium"
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : !isEditing ? (
            <ArrowRight className="size-4" />
          ) : null}
          {isSubmitting
            ? "Guardando..."
            : isEditing
              ? "Guardar cambios"
              : "Guardar y continuar"}
        </Button>
      </form>
    </Form>
  );
}
