import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link as EditorLink } from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Annotation } from '../constants/tiptapExtensions';
import Toolbar from './Toolbar';
import styles from '@styles/components/Scripts.module.scss';
import { AnnotationType } from '../types/AnnotationType';

type ScriptContainerProps = {
  selectedCommentId: string | null;
  selectedBRollAnnotationId: string | null;
  setSelectedCommentId: (id: string | null) => void;
  setSelectedBRollAnnotationId: (id: string | null) => void;
};

const ScriptContainer: FunctionComponent<ScriptContainerProps> = ({
  selectedCommentId,
  selectedBRollAnnotationId,
  setSelectedCommentId,
  setSelectedBRollAnnotationId
}) => {
  const onClick = (annotationType: AnnotationType | null, annotationId: string | null) => {
    setSelectedCommentId(null);
    setSelectedBRollAnnotationId(null);

    if (annotationType === AnnotationType.Comment) {
      setSelectedCommentId(annotationId);
    } else if (annotationType === AnnotationType.BRoll) {
      setSelectedBRollAnnotationId(annotationId);
    }
  };

  const textEditor = useEditor(
    {
      extensions: [
        StarterKit,
        EditorLink.configure({ HTMLAttributes: { target: 'b-roll-preview' } }),
        Underline,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Annotation.configure({ onClick: onClick })
      ],
      content: `<p><strong>Editing Note</strong></p><p>You can find most of the relevant assets referenced in the comments in:</p><ul><li><p>AssetsImagesBeeple artwork</p></li><li><p>YouTubeAssetsImagescryptopunks</p></li><li><p>YouTubeAssetsVideosShould you invest in NFTs</p></li><li><p>as well as YouTubeShould You Invest In NFTsScreenshots and recordings</p></li></ul><p></p><p>I have commented various parts of the scripts with files and effects that can be be used as B-roll. Other parts can show me talking to the camera (ideally they would have some more b-roll but you can add some more within time constraints).</p><p>Regular text is the words I have narrated in the video while italics gives editing annotations.</p><p></p><p>Audio and video were recorded separately so need to be synced.</p><p>Audio file: YouTubeShould You Invest In NFTslue yeti audio.wav</p><p>Video file: YouTubeShould You Invest In NFTsideo footage</p><p></p><p><strong>Are NFTs Worth It? (Script)</strong></p><p></p><p><mark annotation-id="1" annotation-type="Comment" class="${styles.comment}">Should you invest in NFTs?</mark></p><p></p><p><em>Mark Cuban on NFTs: “NFTs are really a gamechanger”</em></p><p><em>Jerry Saltz on Beeple’s NFTs “they’re just stupid, cartoony, original, bro, high school, notebook, blah” Response: it also sold for $69 million</em></p><p><em>CNN clip of Beeple’s artwork: <mark annotation-id="1" annotation-type="BRoll" class="${styles.bRollAnnotation}">“the work of an artist better known as Beeple, whose now the third most valuable living artist behind Jeff Coon’s and Dave Hockney in the world”</mark></em></p><p style="text-align: center"></p><p style="text-align: justify"><mark annotation-id="2" annotation-type="Comment" class="${styles.comment}">Until recently the most Beeple had sold a print of his artwork for was $100. In March this year, Christie’s the famous auction</mark> house sold an NFT of his art titled “The First 5000 days” for $69.3 million.</p><p style="text-align: justify"></p><p style="text-align: justify">Now Christie’s is a world renowned auction house. They’ve sold very prestigious artwork like the likes of Leonardo Da Vinci’s ‘Salvator Mundi’ for $450 million back in 2017. So what’s with the sudden interest in Beeple’s unusual NFT art and</p><p></p><p style="text-align: center"><mark annotation-id="2" annotation-type="BRoll" class="${styles.bRollAnnotation}">“What even is an NFT?”</mark></p><p></p><p style="text-align: justify">NFT stands for Non-Fungible Token. Non-fungible basically just means it represents an item that is unique and irreplaceable. A dollar bill is fungible as it’s clearly not unique, millions are printed each day. When you purchase an NFT though it gives you rights to unique ownership of an item.</p><p style="text-align: justify"></p><p style="text-align: justify">How are they unique?</p><p style="text-align: justify"></p><p style="text-align: justify">Take the crypto punks for example. Cryptopunks are basically small pixellated digital characters. If you look at them … c’mon let’s be honest they’re nothing special at all but people are spending stupid amounts of money to own these things. For example the owner of crypto punk number 6046 was offered just under $10 million for ownership of his NFT and he declined it. Now many people hear about rich guys offering millions for tiny pixellated pieces of artwork and struggle to understand why anyone would want to pay so much for something like this. I mean if you want the thing so badly you could just screenshot it, couldn’t you? So what exactly is the appeal.</p><p style="text-align: justify"></p><p style="text-align: justify">Well let’s take another example.</p><p style="text-align: justify"></p><p style="text-align: justify">Like I mentioned earlier Christie’s sold Leonardo Da Vinci’s ‘Salvator Mundi’ for $450 million. It’s obviously a lot of money but for most people this kind of sale is less ridiculous because we’re used to hearing about famous paintings by artists being sold for these amounts. Usually by artists that died a long, long time ago. Let me ask you a question. What if I 3D printed an exact replica of the Mona Lisa? How much would you pay for it? Probably not very much. I’d bet you’d be a lot more willing to shell out a lot more cash for the original. Why is that? It’s a replica right, I mean it looks exactly like the original so why don’t you value it as much? The sale of art isn’t just about&nbsp;&nbsp;visual appeal and skill it’s also about uniqueness and prestige. People like the idea of owning the original, the one Leanardo himself painted, so they pay millions for it. Well, it’s a very similar concept with NFT art. Most people, including myself, struggle to understand why someone would pay millions for a cryptopunk. Or $65 million for a collage of Beeple’s strange digital artwork. Again if you want it so bad why not just screenshot it. Well just like the Mona Lisa, it’s a matter of prestige. There are a lot of very wealth people that would love to own the original, and they don’t want to settle for anything less than the original.</p><p style="text-align: justify"></p><p style="text-align: justify">Okay you get the point now, there’s prestige, whatever. But are NFTs useful in any way?</p><p style="text-align: justify"></p><p style="text-align: justify">Well the thing is NFTs aren’t just useful for owning digital art, memes, Jack Dorsey’s tweet or cryptopunks. They can be used to own basically anything from a house, to passport, or car. Though why is this important I can own these things already anyway right. Well because of the underlying technology that NFTs are build on they’re basically impossible to steal with today’s technology. If you pay up the right amount of ether then you become the undisputed owner of whatever property or asset that the NFT backs. So let’s say for example you buy a house backed by an NFT. Then it becomes extremely difficult for someone else to claim that they own the house because the blockchain stores a record of all the previous owners of the house. And of course the blockchain is decentralised which means there are multiple copies of it stored on computers across the world. So if say someone wanted to invalidate your claim to your house it wouldn’t be enough to hack the blockchain on a single computer. You’d have to hack probably millions of computers. You become the undisputed owner of the house at the click of a button without having to involve a solicitor or any other middlemen.</p><p style="text-align: justify"></p><p style="text-align: justify">Okay but why would anyone want to invest in NFT art or memes today?&nbsp;</p><p style="text-align: justify"></p><p style="text-align: justify"><em>Several short flashing news clips of people mentioning the metaverse i.e. “the metaverse”, “the metaverse”, “the metaverse”, … , “the metaverse”, then slightly longer clip “what the heck is the metaverse?”</em></p><p style="text-align: justify"></p><p style="text-align: justify">By now you’ve probably heard of the meta verse. To put it simply the metaverse is thought to be the next generation of the internet. It’s an attempt to turn the internet from its present two-dimensional primitive form, into a 3D world like our own, where say if you have a friend that lives 1000 miles away and you’d like to talk to them, instead of having to send them a text or have a video call with them, you could say invite them into your virtual room and you would feel as if your friend is physically present with you in your room</p><p style="text-align: justify"></p><p style="text-align: justify">Well many people speculate that as we start to spend more time in the meta verse, then we’ll start to place greater importance on digital property. If you spend a lot of time chilling in your virtual house then maybe you’d want to decorate the walls with some nice digital paintings. If your into fashion maybe you’d like to wear nice virtual clothes to look presentable. Now this may seem pretty childish to some people, as if you’re obsessing over dressing up your Fortnite or your Roblox avatar, but if you imagine a future where the virtual world becomes mega realistic, just as realistic as the real world, then your experiences inside the virtual world would feel just as real as your experiences in the real world. So if you decide to meet with a friend across the world in your virtual room, or interview at a new job, it would make sense that you would put just as much effort into your virtual appearance as your real appearance.</p><p style="text-align: justify"></p><p style="text-align: justify">NFTs form a reliable record of private ownership of digital assets which essentially brings capitalism into the meta verse. Naturally some people have started investing in NFTs in the hope that they’ll become more important in the meta verse, and in the future in general, which means their demand will rise, their price will rise and they can be flipped for a nice profit.</p><p style="text-align: justify"></p><p style="text-align: justify">So is it worth investing in NFTs? Well, I don’t know you tell me. I guess it’s a pretty vague question, it’s almost like saying is it worth investing in things. Some things will grow in value more than others. It’s really just down to you do your research and you invest your money in whatever you think may be worthwhile.</p><p><br><br><br></p><p>Comments &amp; Recommendations:</p><p><br></p><ul><li><p>I went all in in the intro, because it’s the most important part. It’s when people decide to watch, or close, the videoThe video ends a bit abruptly.</p></li><li><p>I haven’t used overlays or colour graded the stock footage because of lack of time. I think it’s more important to focus on the rhythm of the video. But it can do it if you want to, no problem.</p></li><li><p>With time I will design a reuse transition and sound design that I’ll do especially for you. This will help with brand identity and coherence. I’m conscious that it can seem a bit all over the place at the moment.</p></li><li><p>Please let me know if you would like me to change anything, if there are some awkward cuts or if you have more ideas. I need your feedback to make flawless edits!</p></li><li><p>You seem to be talking with ease in front of a camera. This is a rare skill. I would recommend you to vary your intonations and speech patterns though. This would make for more dynamic videos.</p></li><li><p>I could use pointers to indicate me the different parts of the video (eg. 1intro, 2what are NFT, 3Metaverse 4outro). This would help me create clear chapters and improve the storytelling.</p></li><li><p>Better have a clean desk for this kind of videos&nbsp;</p></li></ul><p><br></p>`
    },
    []
  );

  // TODO: Currently the selection of annotations and comments is slightly buggy. It looks like we can have both a selected
  // comment and annotation at the same time which may be undesirable. It also seems that  b roll annotation ids and comment
  // ids are sometimes mixed up.
  useEffect(() => {
    // TODO: Change the background color of the selected comment.
    var range = document.createRange();
    var selection = window.getSelection();

    const scriptComment: HTMLElement | null = document.querySelector(
      `[annotation-id="${selectedCommentId}"][annotation-type="${AnnotationType.Comment}"]`
    );

    if (scriptComment) {
      scriptComment.scrollIntoView({ block: 'center' });
      range.selectNodeContents(scriptComment);
      selection?.removeAllRanges();
      selection?.addRange(range);
      return;
    }

    const scriptBRollAnnotation: HTMLElement | null = document.querySelector(
      `[annotation-id="${selectedBRollAnnotationId}"][annotation-type="${AnnotationType.BRoll}"]`
    );
    if (scriptBRollAnnotation) {
      scriptBRollAnnotation.scrollIntoView({ block: 'center' });
      range.selectNodeContents(scriptBRollAnnotation);
      selection?.removeAllRanges();
      selection?.addRange(range);
      return;
    }
  }, [selectedCommentId, selectedBRollAnnotationId]);

  return (
    <>
      <div className={styles.scriptContainer}>
        <Toolbar textEditor={textEditor} className={`${styles.scriptToolbar}`} />
        <EditorContent editor={textEditor} className={`${styles.script}`} />
      </div>
    </>
  );
};

export default ScriptContainer;
