-- CreateTable
CREATE TABLE "PetPictures" (
    "id" TEXT NOT NULL,
    "picture_url" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "PetPictures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetPictures" ADD CONSTRAINT "PetPictures_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
