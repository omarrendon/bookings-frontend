"use client";
// Dependencies
import { useRef, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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

export default function BusinessSetupForm() {
  const form = useForm<BusinessSetupValues>({
    resolver: zodResolver(businessSetupSchema),
    defaultValues: {
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "social_links",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    // TODO: Upload file and set main_image_url with returned URL from API
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const MAX_GALLERY = 5;
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const remaining = MAX_GALLERY - galleryPreviews.length;
    const newPreviews = files
      .slice(0, remaining)
      .map(f => URL.createObjectURL(f));
    setGalleryPreviews(prev => [...prev, ...newPreviews]);
    // TODO: Upload files and push returned URLs to gallery_images
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const [stateOpen, setStateOpen] = useState(false);
  const [stateQuery, setStateQuery] = useState("");
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  const filteredStates = stateQuery.trim()
    ? MEXICAN_STATES.filter(s =>
        s.toLowerCase().includes(stateQuery.toLowerCase())
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

  const onSubmit = async () => {
    try {
      // TODO: Call create business API
      toast.success("Negocio configurado correctamente. ¡Bienvenido!");
    } catch {
      toast.error("No se pudo guardar la configuración. Inténtalo de nuevo.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        {/* Sección 1: Información del negocio */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-primary" />
            <h3 className="font-semibold text-sm">Información del negocio</h3>
          </div>
          <Separator />
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-1">
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
                <FormItem className="grid gap-1">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe tu negocio brevemente..."
                      className="resize-none"
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
                  <FormItem className="grid gap-1">
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
                  <FormItem className="grid gap-1">
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

        {/* Sección 2: Dirección */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            <h3 className="font-semibold text-sm">Dirección</h3>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="grid gap-1 sm:col-span-2">
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
                  <FormItem className="grid gap-1">
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
                  <FormItem className="grid gap-1">
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
                  <FormItem className="grid gap-1">
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
                  <FormItem className="grid gap-1">
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
                  <FormItem className="grid gap-1">
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
                          <div className="absolute z-50 w-full mt-1 max-h-52 overflow-y-auto rounded-md border bg-popover shadow-md">
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
                  <FormItem className="grid gap-1">
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
                <FormItem className="grid gap-1">
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

        {/* Sección 3: Redes sociales */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="size-4 text-primary" />
              <h3 className="font-semibold text-sm">Redes sociales</h3>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ platform: "", url: "" })}
            >
              <Plus className="size-4" />
              Agregar
            </Button>
          </div>
          <Separator />
          {fields.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-2">
              No has agregado ninguna red social.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <FormField
                    control={form.control}
                    name={`social_links.${index}.platform`}
                    render={({ field }) => (
                      <FormItem className="grid gap-1 w-40 shrink-0">
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
                                <SelectItem key={p} value={p}>
                                  {p}
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
                      <FormItem className="grid gap-1 flex-1">
                        <FormControl>
                          <Input
                            placeholder="https://instagram.com/tunegocio"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección 4: Imagen principal */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ImagePlus className="size-4 text-primary" />
            <h3 className="font-semibold text-sm">Imagen principal</h3>
          </div>
          <Separator />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <div className="relative w-full rounded-lg overflow-hidden border aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Vista previa"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-background/80 hover:bg-background text-foreground rounded-full p-1 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
            >
              <Upload className="size-8" />
              <span className="text-sm font-medium">
                Haz clic para seleccionar una imagen
              </span>
              <span className="text-xs">
                PNG, JPG, WEBP — máx. recomendado 2MB
              </span>
            </button>
          )}
        </div>

        {/* Sección 5: Galería de imágenes */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImagePlus className="size-4 text-primary" />
              <h3 className="font-semibold text-sm">Galería de imágenes</h3>
            </div>
            <span className="text-xs text-muted-foreground">
              {galleryPreviews.length} / {MAX_GALLERY}
            </span>
          </div>
          <Separator />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleGalleryChange}
          />
          <div className="grid grid-cols-3 gap-2">
            {galleryPreviews.map((src, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border"
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
                  className="absolute top-1 right-1 bg-background/80 hover:bg-background text-foreground rounded-full p-0.5 transition-colors"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
            {galleryPreviews.length < MAX_GALLERY && (
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="aspect-square flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                <Plus className="size-5" />
                <span className="text-xs">Agregar</span>
              </button>
            )}
          </div>
          {galleryPreviews.length === 0 && (
            <p className="text-xs text-muted-foreground text-center -mt-1">
              Puedes agregar hasta {MAX_GALLERY} imágenes para mostrar tu
              negocio.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer"
          >
            {isSubmitting ? "Guardando..." : "Guardar y continuar"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Los campos marcados con <span className="text-destructive">*</span>{" "}
            son obligatorios
          </p>
        </div>
      </form>
    </Form>
  );
}
