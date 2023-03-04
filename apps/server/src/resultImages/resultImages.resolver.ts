import { Resolver, Query, Args } from '@nestjs/graphql'
import { GetResultImagesInput } from './models/getResultImages.input'
import { ResultImageModel } from './models/resultImage.model'
import { ResultImagesService } from './resultImages.service'

@Resolver(() => ResultImageModel)
export class ResultImagesResolver {
  constructor(private resultImageService: ResultImagesService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => [ResultImageModel])
  resultImages(@Args('input') data: GetResultImagesInput) {
    const { content, take, cursor } = data

    return this.resultImageService.getManyResultImages(content, { take, cursor })
  }
}
