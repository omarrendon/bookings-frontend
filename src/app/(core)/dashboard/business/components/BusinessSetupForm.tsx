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
  MapPin,
  Share2,
  ImagePlus,
  Plus,
  Trash2,
  Upload,
  X,
  ChevronsUpDown,
  Check,
  ArrowRight,
  Images,
} from "lucide-react";
// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export default function BusinessSetupForm() {
  const business = useBusinessStore(state => state.business);
  const isEditing = !!business;

  const createBusiness = useCreateBusiness();
  const updateBusiness = useUpdateBusiness(business?.id ?? "");

  const buildSocialLinks = (links: typeof business.social_links) =>
    (links ?? []).map(link => {
      const platformInfo = SOCIAL_PLATFORMS.find(p => p.name === link.platform);
      const baseUrl = platformInfo?.baseUrl ?? "";
      return {
        platform: link.platform,
        url:
          baseUrl && link.url.startsWith(baseUrl)
            ? link.url.slice(baseUrl.length)
            : link.url,
      };
    });

  console.log("Business data from store:", business);

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

  const { isSubmitting } = form.formState;

  // Fallback: si el store carga de forma asíncrona después del mount
  useEffect(() => {
    if (!business) return;

    form.reset({
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
    });

    if (business.main_image_url) {
      setImagePreview(business.main_image_url);
    }

    if (business.gallery_images && business.gallery_images.length > 0) {
      setGalleryPreviews(business.gallery_images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [business]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "social_links",
  });

  const socialLinksWatch = form.watch("social_links") ?? [];

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

  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
      setGalleryPreviews(prev =>
        prev.slice(0, prev.length - newPreviews.length),
      );
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    const current = form.getValues("gallery_images") ?? [];
    form.setValue(
      "gallery_images",
      current.filter((_, i) => i !== index),
    );
  };

  // ── Dropdown de estado ────────────────────────────────────────────────────
  const [stateOpen, setStateOpen] = useState(false);
  const [stateQuery, setStateQuery] = useState("");
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  const filteredStates = stateQuery.trim()
    ? MEXICAN_STATES.filter(s =>
        s.toLowerCase().includes(stateQuery.toLowerCase()),
      )
    : MEXICAN_STATES;

  useEffect(() => {
    if (!stateOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(e.target as Node)
      ) {
        setStateOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [stateOpen]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = async (values: BusinessSetupValues) => {
    const payload = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== "" && v !== undefined),
    ) as BusinessSetupValues;

    if (payload.social_links) {
      payload.social_links = payload.social_links.map(link => {
        const platformInfo = SOCIAL_PLATFORMS.find(
          p => p.name === link.platform,
        );
        const baseUrl = platformInfo?.baseUrl ?? "";
        return { platform: link.platform, url: baseUrl + link.url };
      });
    }

    if (isEditing) {
      await updateBusiness.mutateAsync(payload);
    } else {
      await createBusiness.mutateAsync(payload);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {/* ── Sección 1: Información del negocio ── */}
        <div className="bg-card rounded-2xl border overflow-hidden">
          <div className="px-6 py-5 border-b flex items-center gap-2">
            <Globe className="size-4 text-primary" />
            <h3 className="font-semibold tracking-tight">
              Información del negocio
            </h3>
          </div>
          <div className="p-6 flex flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre del negocio{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Mi negocio" {...field} />
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
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe tu negocio brevemente..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="5512345678" type="tel" {...field} />
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
                    <FormLabel>Sitio web</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://tunegocio.com"
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* ── Sección 2: Dirección ── */}
        <div className="bg-card rounded-2xl border overflow-hidden">
          <div className="px-6 py-5 border-b flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            <h3 className="font-semibold tracking-tight">Dirección</h3>
          </div>
          <div className="p-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>
                      Calle <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Av. Insurgentes" {...field} />
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
                    <FormLabel>
                      No. Ext. <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="100" {...field} />
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
                    <FormLabel>No. Int.</FormLabel>
                    <FormControl>
                      <Input placeholder="A" {...field} />
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
                    <FormLabel>Colonia</FormLabel>
                    <FormControl>
                      <Input placeholder="Centro" {...field} />
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
                    <FormLabel>
                      Ciudad <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ciudad de México" {...field} />
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
                    <FormLabel>
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
                            className="pr-8"
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
                    <FormLabel>
                      C.P. <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="06600" {...field} />
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
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input placeholder="México" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ── Sección 3: Redes sociales ── */}
        <div className="bg-card rounded-2xl border overflow-hidden">
          <div className="px-6 py-5 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="size-4 text-primary" />
              <h3 className="font-semibold tracking-tight">Redes sociales</h3>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full gap-1.5 text-xs"
              onClick={() => append({ platform: "", url: "" })}
            >
              <Plus className="size-3.5" />
              Agregar
            </Button>
          </div>
          <div className="p-6">
            {fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
                <Share2 className="size-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  No has agregado ninguna red social.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full gap-1.5 text-xs mt-1"
                  onClick={() => append({ platform: "", url: "" })}
                >
                  <Plus className="size-3.5" />
                  Agregar red social
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {fields.map((field, index) => {
                  const platformName = socialLinksWatch[index]?.platform ?? "";
                  const platformInfo = SOCIAL_PLATFORMS.find(
                    p => p.name === platformName,
                  );
                  const prefix = platformInfo?.baseUrl
                    ? platformInfo.baseUrl.replace("https://", "")
                    : "";

                  return (
                    <div key={field.id} className="flex gap-2 items-start">
                      <FormField
                        control={form.control}
                        name={`social_links.${index}.platform`}
                        render={({ field }) => (
                          <FormItem className="w-40 shrink-0">
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Plataforma" />
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
                      <FormField
                        control={form.control}
                        name={`social_links.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <div className="flex">
                                {prefix && (
                                  <span className="inline-flex items-center h-9 px-2.5 rounded-l-md border border-r-0 bg-muted text-muted-foreground text-xs whitespace-nowrap select-none">
                                    {prefix}
                                  </span>
                                )}
                                <Input
                                  placeholder={
                                    platformInfo?.placeholder ?? "usuario"
                                  }
                                  className={prefix ? "rounded-l-none" : ""}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Sección 4: Imagen principal ── */}
        <div className="bg-card rounded-2xl border overflow-hidden">
          <div className="px-6 py-5 border-b flex items-center gap-2">
            <ImagePlus className="size-4 text-primary" />
            <h3 className="font-semibold tracking-tight">Imagen principal</h3>
          </div>
          <div className="p-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <div className="relative w-full rounded-xl overflow-hidden border aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 size-7 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors shadow-sm"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/40 transition-colors py-10 cursor-pointer"
              >
                <Upload className="size-7 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Haz clic para seleccionar una imagen
                </span>
                <span className="text-xs text-muted-foreground/70">
                  PNG, JPG, WEBP — máx. recomendado 2 MB
                </span>
              </button>
            )}
          </div>
        </div>

        {/* ── Sección 5: Galería ── */}
        <div className="bg-card rounded-2xl border overflow-hidden">
          <div className="px-6 py-5 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Images className="size-4 text-primary" />
              <h3 className="font-semibold tracking-tight">
                Galería de imágenes
              </h3>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              {galleryPreviews.length} / {MAX_GALLERY}
            </span>
          </div>
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
                className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/40 transition-colors py-10 cursor-pointer"
              >
                <Images className="size-7 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Haz clic para agregar imágenes
                </span>
                <span className="text-xs text-muted-foreground/70">
                  Puedes agregar hasta {MAX_GALLERY} imágenes
                </span>
              </button>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {galleryPreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden border"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(index)}
                      className="absolute top-1.5 right-1.5 size-6 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors shadow-sm"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
                {galleryPreviews.length < MAX_GALLERY && (
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="aspect-square flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/40 text-muted-foreground transition-colors cursor-pointer"
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
          className="w-full rounded-full gap-2"
        >
          {isSubmitting
            ? "Guardando..."
            : isEditing
              ? "Guardar cambios"
              : "Guardar y continuar"}
          {!isSubmitting && !isEditing && <ArrowRight className="size-4" />}
        </Button>
      </form>
    </Form>
  );
}
